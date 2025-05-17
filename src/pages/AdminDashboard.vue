<template>
  <DashboardLayout>
    <v-container
      class="fill-height d-flex flex-column justify-center align-center text-center"
    >
      <v-card elevation="6" class="pa-8" max-width="600">
        <v-avatar size="64" class="mb-4" color="primary">
          <v-icon size="36">mdi-account-circle</v-icon>
        </v-avatar>

        <h1 class="text-h4 font-weight-bold mb-2">
          Welcome, {{ user.firstName }} 👋
        </h1>
        <p class="text-body-1 mb-4">
          "You're in control. Let’s build something awesome!"
        </p>
      </v-card>
    </v-container>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "../layouts/DashboardLayout.vue";
import { useDashboard } from "../composables/useDashboard";

const { user, goToUpload, goToPlaylists, goToMedia } = useDashboard();
</script>
