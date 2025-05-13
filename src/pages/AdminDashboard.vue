<template>
  <v-container class="mt-6">
    <v-row justify="space-between" align="center" class="mb-6">
      <v-col cols="auto">
        <h1 class="text-h5 font-weight-bold">
          Welcome, {{ user.firstName }} 👋
        </h1>
      </v-col>
      <v-col cols="auto">
        <v-btn color="error" @click="handleLogout">Logout</v-btn>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" md="4">
        <v-card class="pa-4" elevation="5">
          <h2 class="text-subtitle-1 font-weight-bold mb-2">Upload Media</h2>
          <v-btn color="indigo" @click="goToUpload" block>Go to Upload</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4" elevation="5">
          <h2 class="text-subtitle-1 font-weight-bold mb-2">
            Manage Playlists
          </h2>
          <v-btn color="indigo" @click="goToPlaylists" block
            >Go to Playlists</v-btn
          >
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4" elevation="5">
          <h2 class="text-subtitle-1 font-weight-bold mb-2">Media Library</h2>
          <v-btn color="indigo" @click="goToMedia" block>Go to Media</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref({});

onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    router.push("/"); // no user? redirect to login
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
</script>
