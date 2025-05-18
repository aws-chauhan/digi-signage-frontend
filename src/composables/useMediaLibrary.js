import { ref, onMounted, computed } from "vue";
import axios from "axios";

export function useMediaLibrary() {
  const mediaList = ref([]);
  const searchTerm = ref("");

  const filteredMedia = computed(() => {
    const term = searchTerm.value.toLowerCase().trim();
    return mediaList.value.filter((item) =>
      item.filename.toLowerCase().includes(term)
    );
  });

  onMounted(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}media/all`, {
        withCredentials: true,
      });
      mediaList.value = res.data.media;
    } catch (err) {
      console.error("❌ Failed to fetch media:", err);
    }
  });

  return {
    mediaList,
    searchTerm,
    filteredMedia,
  };
}
