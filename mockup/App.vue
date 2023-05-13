<script setup>
import { onMounted, onUnmounted, ref, onBeforeMount, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const route = useRoute();
const router = useRouter();
const firebaseConfig = {
  apiKey: "AIzaSyA0YLTQBMu-MWBTlp-ej1OikP3sb56DUg8",
  authDomain: "mobile-order-67c54.firebaseapp.com",
  projectId: "mobile-order-67c54",
  storageBucket: "mobile-order-67c54.appspot.com",
  messagingSenderId: "275756787927",
  appId: "1:275756787927:web:9c49f81e52d6a00e736892",
  measurementId: "G-W3ZY1G78C6",
};

const fireApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireApp);

// const fs = require("fs");
// const path = require("path");

// onMounted(() => {
//   router.push({
//     name: "VendorPortal",
//   });
// });
</script>

<template>
  <div id="app" class="wrapper">
    <router-view />
  </div>
</template>

<style scoped></style>
