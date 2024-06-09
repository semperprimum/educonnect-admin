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
import { createI18n } from "vue-i18n";
import ru from "@/i18n/ru.json";
import kz from "@/i18n/kz.json";
import customRule from "@/i18n/customPluralization.ts";

const app = createApp(App);
const pinia = createPinia();
const i18n = createI18n({
  legacy: false,
  locale: "ru",
  fallbackLocale: "ru",
  pluralRules: {
    ru: customRule,
  },
  messages: {
    kz,
    ru,
  },
});

app.use(pinia);

app.use(router);

app.use(VCalendar, {});

app.use(i18n);

app.mount("#app");
