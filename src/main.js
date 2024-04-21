import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@fontsource-variable/inter";
import "@fontsource-variable/nunito";

const app = createApp(App);

app.use(router);

app.mount("#app");
