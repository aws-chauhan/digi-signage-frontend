import { ref, onMounted } from "vue";
import axios from "axios";

export function useMediaLibrary() {
  const mediaList = ref([]);

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
  };
}
