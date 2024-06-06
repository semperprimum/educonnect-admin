import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@fontsource-variable/inter";
import "@fontsource-variable/nunito";
import "v-calendar/style.css";
import "vue-multiselect/dist/vue-multiselect.css";
import VCalendar from "v-calendar";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

app.use(router);

app.use(VCalendar, {});

app.mount("#app");
