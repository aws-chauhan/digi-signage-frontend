// File: composables/useDashboard.js
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export function useDashboard() {
  const router = useRouter();
  const user = ref({});

  onMounted(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/"); // Redirect to login if user not found
    } else {
      user.value = JSON.parse(storedUser);
    }
  });

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const goToUpload = () => router.push("/upload");
  const goToPlaylists = () => router.push("/playlists");
  const goToMedia = () => router.push("/media");

  return {
    user,
    handleLogout,
    goToUpload,
    goToPlaylists,
    goToMedia,
  };
}
