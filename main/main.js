import { createApp } from "vue";
import PrimeVue from "primevue/config";

import "primevue/resources/themes/aura-dark-teal/theme.css";
import Button from "primevue/button";
import Card from "primevue/card";
import ScrollTop from "primevue/scrolltop";
import Dialog from "primevue/dialog";
import DataView from "primevue/dataview";
import Tag from "primevue/tag";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import SelectButton from "primevue/selectbutton";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(PrimeVue);
app.component("Button", Button);
app.component("Card", Card);
app.component("ScrollTop", ScrollTop);
app.component("Dialog", Dialog);
app.component("DataView", DataView);
app.component("Tag", Tag);
app.component("InputText", InputText);
app.component("InputMask", InputMask);
app.component("SelectButton", SelectButton);

app.use(router);

app.mount("#app");
