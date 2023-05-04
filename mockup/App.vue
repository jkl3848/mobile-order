<script setup>
import { onMounted, onUnmounted, ref, onBeforeMount, provide } from "vue";

import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();

// const fs = require("fs");
// const path = require("path");

onMounted(() => {
  router.push({
    name: "VendorPortal",
  });
});
</script>

<template>
  <div id="app" class="wrapper">
    <router-view />
  </div>
</template>

<style scoped></style>
