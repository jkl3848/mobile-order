import { createWebHistory, createRouter } from "vue-router";
import VendorPortal from "../components/VendorPortal.vue";

const routes = [
  {
    path: "/",
    redirect: "/vendorportal",
  },
  {
    path: "/vendorportal",
    name: "VendorPortal",
    component: VendorPortal,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
