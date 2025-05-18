<template>
  <DashboardLayout>
    <v-container fluid class="mt-6 media-page-container">
      <h1 class="text-h4 font-weight-bold mb-2">📁 Media Library</h1>
      <p class="text-body-1 mb-6">
        Here you can view, search, and manage uploaded media files.
      </p>

      <v-text-field
        v-model="searchTerm"
        label="Search by name"
        prepend-icon="mdi-magnify"
        class="mb-4"
        clearable
      />

      <v-row>
        <v-col
          v-for="item in filteredMedia"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <MediaCard :media="item" />
        </v-col>
      </v-row>

      <v-alert
        v-if="filteredMedia.length === 0"
        type="info"
        variant="outlined"
        class="mt-4"
      >
        No media found for your search.
      </v-alert>
    </v-container>
  </DashboardLayout>
</template>

<script setup>
import { useMediaLibrary } from "../composables/useMediaLibrary.js";
import MediaCard from "../components/MediaCard.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";

const { searchTerm, filteredMedia } = useMediaLibrary();
</script>
