<template>
  <v-card class="pa-4">
    <h2>Playlists</h2>

    <v-form @submit.prevent="submit">
      <v-text-field v-model="form.name" label="Name" required></v-text-field>
      <v-text-field
        v-model="form.scheduleStart"
        label="Start (ISO)"
        required
      ></v-text-field>
      <v-text-field
        v-model="form.scheduleEnd"
        label="End (ISO)"
        required
      ></v-text-field>
      <v-btn type="submit" color="primary" class="mt-2">Create Playlist</v-btn>
    </v-form>

    <v-divider class="my-4"></v-divider>

    <v-list v-if="playlists.length">
      <v-list-item
        v-for="playlist in playlists"
        :key="playlist.id"
        :title="playlist.name"
        :subtitle="`${playlist.scheduleStart} → ${playlist.scheduleEnd}`"
      />
    </v-list>

    <v-alert type="info" v-else>No playlists found.</v-alert>
  </v-card>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { usePlaylistStore } from "../store/playlistStore";

const store = usePlaylistStore();
const playlists = store.playlists;
const form = reactive({
  name: "",
  scheduleStart: "",
  scheduleEnd: "",
  items: [], // Will be updated later
});

const submit = async () => {
  await store.addPlaylist(form);
  form.name = "";
  form.scheduleStart = "";
  form.scheduleEnd = "";
};

onMounted(() => {
  store.fetchPlaylists();
});
</script>
