import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import svgIcon from "@/plugin/SvgIcon.vue";
import "virtual:svg-icons-register";


const app = createApp(App);
app.component("svg-icon", svgIcon);
app.use(ElementPlus);
app.use(createPinia());
app.use(router);

app.mount("#app");
