import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  base: "./",
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    cssInjectedByJsPlugin(),
  ],
  // resolve: {
  //   alias: {
  //     vue: "vue/dist/vue.esm-bundler.js",
  //   },
  //   extensions: [".js", ".css"],
  // },
});
