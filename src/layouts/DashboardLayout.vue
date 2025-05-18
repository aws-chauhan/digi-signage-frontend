<!-- File: src/layouts/DashboardLayout.vue -->
<template>
  <v-app>
    <!-- ✅ Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :permanent="!isMobile"
      :temporary="isMobile"
      app
      width="240"
    >
      <v-list>
        <v-list-item>
          <v-list-item-title class="text-h6">CMS</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item
          v-for="item in navItems"
          :key="item.label"
          :to="item.path"
          link
          exact
        >
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <v-list-item @click="handleLogout">
          <v-list-item-title class="text-error">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- ✅ App Bar -->
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-toolbar-title>CMS Dashboard</v-toolbar-title>
    </v-app-bar>

    <!-- ✅ Main Content -->
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

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Upload Media", path: "/upload" },
  { label: "Manage Playlists", path: "/playlists" },
  { label: "Media Library", path: "/medialib" },
  { label: "Manage Terminal", path: "/medialib" },
];

const handleLogout = () => {
  localStorage.clear();
  router.push("/");
};
</script>
