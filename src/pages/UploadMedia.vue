<template>
  <v-container class="mt-8">
    <v-card class="pa-6" elevation="8">
      <h2 class="text-h5 font-weight-bold mb-4">Upload Media</h2>
      <v-form @submit.prevent="handleUpload">
        <v-file-input
          v-model="file"
          label="Choose Media File"
          accept="image/*,video/*"
          show-size
          :rules="[fileSizeRule]"
          required
        ></v-file-input>

        <v-btn type="submit" color="primary" class="mt-4" :loading="uploading">
          Upload
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const file = ref(null);
const uploading = ref(false);
const MAX_SIZE_MB = 10;

const fileSizeRule = (value) => {
  return !value || value.size <= MAX_SIZE_MB * 1024 * 1024
    ? true
    : `File must be under ${MAX_SIZE_MB}MB`;
};

const handleUpload = async () => {
  if (!file.value) return alert("Please select a file");

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user?.id) return alert("Missing user session");

  const formData = new FormData();
  formData.append("file", file.value);
  formData.append("userId", user.id);

  try {
    uploading.value = true;
    await axios.post(`${import.meta.env.VITE_API_URL}upload`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Upload successful");
    file.value = null;
  } catch (err) {
    console.error(err);
    alert("Upload failed");
  } finally {
    uploading.value = false;
  }
};
</script>
