import { ref, watch } from "vue";
import axios from "axios";

export const file = ref(null);
export const description = ref("");
export const selectedTags = ref([]);
export const tagSuggestions = ref([]);
export const tagSearch = ref("");
export const uploading = ref(false);
const MAX_SIZE_MB = 10;

export const fileSizeRule = (value) => {
  return !value || value.size <= MAX_SIZE_MB * 1024 * 1024
    ? true
    : `File must be under ${MAX_SIZE_MB}MB`;
};

watch(tagSearch, async (val) => {
  console.log("⌨️ User typed:", val);
  if (!val) return;

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}tags?search=${encodeURIComponent(val)}`,
      { withCredentials: true }
    );
    tagSuggestions.value = res.data.tags.map((tag) => tag.name);
    console.log("📦 Suggestions from API:", tagSuggestions.value);
  } catch (err) {
    console.error("❌ Failed to fetch tag suggestions:", err);
  }
});

export const handleUpload = async () => {
  if (!file.value) return alert("Please select a file");

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user?.id) return alert("Missing user session");

  const filename = file.value.name;
  const filetype = file.value.type;

  try {
    uploading.value = true;

    const presignRes = await axios.post(
      `${import.meta.env.VITE_API_URL}media/presigned-url`,
      { filename, filetype, userId: user.id },
      { withCredentials: true }
    );

    const { url, key } = presignRes.data;
    console.log("🔗 Presigned URL:", url);
    console.log("🗂️ S3 Key:", key);

    await axios.put(url, file.value, {
      headers: { "Content-Type": filetype },
    });

    const confirmRes = await axios.post(
      `${import.meta.env.VITE_API_URL}media/confirm-upload`,
      {
        key,
        userId: user.id,
        filename,
        mimeType: filetype,
        fileSize: file.value.size,
        description: description.value,
        tags: selectedTags.value,
      },
      { withCredentials: true }
    );

    console.log("✅ DB Confirm Response:", confirmRes.data);
    alert("✅ Upload successful");

    file.value = null;
    description.value = "";
    selectedTags.value = [];
  } catch (err) {
    if (err.response) {
      console.error("❌ Server error:", err.response.status, err.response.data);
    } else if (err.request) {
      console.error("❌ No server response:", err.request);
    } else {
      console.error("❌ Upload error:", err.message);
    }
    alert("Upload failed");
  } finally {
    uploading.value = false;
  }
};

export const customTagFilter = (item, queryText, itemText) => {
  return itemText.toLowerCase().includes(queryText.toLowerCase());
};

export const handleTagChange = (newTags) => {
  // If the latest entry isn't in suggestions, add it
  const lastTag = newTags[newTags.length - 1];
  if (lastTag && !tagSuggestions.value.includes(lastTag)) {
    tagSuggestions.value.push(lastTag);
  }
  selectedTags.value = newTags;
};

export const addCustomTag = () => {
  const trimmed = tagSearch.value.trim();
  if (trimmed && !selectedTags.value.includes(trimmed)) {
    selectedTags.value.push(trimmed);
    tagSearch.value = "";
  }
};
