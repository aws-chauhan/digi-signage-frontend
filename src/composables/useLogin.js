import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
axios.defaults.withCredentials = true;

export function useLogin() {
  const username = ref("");
  const password = ref("");
  const loading = ref(false);
  const router = useRouter();

  const handleLogin = async () => {
    loading.value = true;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}login`,
        {
          username: username.value,
          password: password.value,
        },
        {
          withCredentials: true,
        }
      );

      const { user } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (err) {
      alert("Invalid credentials or server error");
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    username,
    password,
    loading,
    handleLogin,
  };
}
