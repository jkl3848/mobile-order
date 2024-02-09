import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import ReactivityTransform from "@vue-macros/reactivity-transform/vite";
import VueMacros from "unplugin-vue-macros/vite";
import Vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "./",
  plugins: [
    ReactivityTransform(),
    cssInjectedByJsPlugin(),
    VueMacros({
      plugins: {
        vue: Vue(),
        // vueJsx: VueJsx(), // if needed
      },
    }),
  ],
  // resolve: {
  //   alias: {
  //     vue: "vue/dist/vue.esm-bundler.js",
  //   },
  //   extensions: [".js", ".css"],
  // },
});
