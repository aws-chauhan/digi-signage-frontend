<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :permanent="!isMobile"
      :temporary="isMobile"
      app
      width="240"
    >
      <v-list nav dense class="pt-4">
        <!-- Title -->
        <v-list-item>
          <v-list-item-title class="text-h6 font-weight-bold text-primary">
            CMS Dashboard
          </v-list-item-title>
        </v-list-item>
        <v-divider class="my-2" />

        <!-- Navigation Links -->
        <v-list-item
          v-for="item in navItems"
          :key="item.label"
          :to="item.path"
          link
          exact
          class="rounded-lg my-1"
          active-class="bg-grey-lighten-3"
        >
          <v-list-item-title class="text-body-1">{{
            item.label
          }}</v-list-item-title>
        </v-list-item>

        <v-divider class="my-4" />

        <!-- Logout -->
        <v-list-item @click="handleLogout" class="rounded-lg">
          <v-list-item-title class="text-body-1 text-error font-weight-medium">
            Logout
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-6">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const router = useRouter();
const { mobile } = useDisplay();

const drawer = ref(true);
const isMobile = ref(false);

onMounted(() => {
  isMobile.value = mobile.value;
});

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Upload Media", path: "/upload" },
  { label: "Manage Playlists", path: "/playlists" },
  { label: "Media Library", path: "/medialib" },
  { label: "Manage Terminal", path: "/terminal" }, // fixed duplicate path
];

const handleLogout = () => {
  localStorage.clear();
  router.push("/");
};
</script>

<style scoped>
.v-list-item--active {
  font-weight: 500;
}
</style>
