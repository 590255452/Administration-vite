import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./plugin/mock";
import "@/router/navigation";

import svgIcon from "@/plugin/SvgIcon.vue";
import "virtual:svg-icons-register";
import piniaPluginPersist from "pinia-plugin-persist";

const pinia = createPinia();
pinia.use(piniaPluginPersist);

const app = createApp(App);
app.component("svg-icon", svgIcon);
app.use(ElementPlus);
app.use(router);
app.use(pinia);

app.mount("#app");
