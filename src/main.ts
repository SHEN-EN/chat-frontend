import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./fonts/font.css";
import App from "./App.vue";
import router from "./router";
import "//at.alicdn.com/t/c/font_4383173_p4sle26s5ka.js";
import "./scss/reset.scss";
import "./scss/el-global.scss";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount("#app");
