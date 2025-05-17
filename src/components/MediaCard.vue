<template>
  <v-card class="ma-2" elevation="4">
    <v-img
      :src="media.fileUrl"
      height="200px"
      cover
      class="bg-grey-lighten-2"
    />
    <v-card-title class="text-wrap">{{ media.filename }}</v-card-title>
    <v-card-subtitle>{{ media.mimeType }}</v-card-subtitle>
    <v-card-text class="text-body-2">{{ media.description }}</v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  media: Object,
});
</script>
