// File: src/pages/UploadMedia.vue
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
        />

        <v-text-field v-model="description" label="Description" class="mt-4" />

        <v-autocomplete
          v-model="selectedTags"
          v-model:search="tagSearch"
          :items="tagSuggestions"
          label="Tags"
          chips
          multiple
          deletable-chips
          hide-selected
          clearable
          :custom-value="true"
          :menu-props="{ closeOnContentClick: false }"
          @keydown.enter.stop.prevent="addCustomTag"
          class="mt-2"
        />

        <v-btn type="submit" color="primary" class="mt-4" :loading="uploading">
          Upload
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import {
  file,
  description,
  selectedTags,
  tagSuggestions,
  tagSearch,
  uploading,
  fileSizeRule,
  handleUpload,
  addCustomTag,
} from "../composables/useMediaUpload";
</script>
