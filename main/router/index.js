import { createWebHistory, createRouter } from "vue-router";
import VendorPortal from "../components/VendorPortal.vue";
import VendorLogin from "../components/VendorLogin.vue";
import ClientPortal from "../components/ClientPortal.vue";

const routes = [
  {
    path: "/vendorportal",
    name: "VendorPortal",
    component: VendorPortal,
  },
  {
    path: "/",
    name: "VendorLogin",
    component: VendorLogin,
  },
  {
    path: "/clientportal",
    name: "ClientPortal",
    component: ClientPortal,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
