import { createApp } from "vue";
// import "./style.css";

import App from "../App.vue";
import router from "../router";

// import FloatingVue from "floating-vue";
// import "floating-vue/dist/style.css";
// FloatingVue.options.strategy = "fixed";
// FloatingVue.options.container = "sp-theme";

const app = createApp(App);

app.use(router);

// app.use(FloatingVue);

app.mount("#vendor-portal");
