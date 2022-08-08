import Vue from "vue";
import VueCompositionAPI, { createApp } from "@vue/composition-api";

Vue.use(VueCompositionAPI);

import "./style.css";
import App from "./App.vue";

createApp(App).mount("#app");
