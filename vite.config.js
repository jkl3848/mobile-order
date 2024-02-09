import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import ReactivityTransform from "@vue-macros/reactivity-transform/vite";

export default defineConfig({
  base: "./",
  plugins: [ReactivityTransform(), cssInjectedByJsPlugin()],
  // resolve: {
  //   alias: {
  //     vue: "vue/dist/vue.esm-bundler.js",
  //   },
  //   extensions: [".js", ".css"],
  // },
});
