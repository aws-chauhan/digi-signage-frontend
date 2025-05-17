import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/Login.vue";
import MediaPage from "../pages/MediaPage.vue"; // ✅ Make sure this file exists
import AdminDashboard from "../pages/AdminDashboard.vue";
import UploadMedia from "../pages/UploadMedia.vue";

const routes = [
  { path: "/", component: LoginPage },
  { path: "/dashboard", component: AdminDashboard },
  { path: "/medialib", component: MediaPage },
  { path: "/upload", component: UploadMedia },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
