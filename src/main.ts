import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "/@/store";
import VueI18n from "../src/plugins/i18n";
import { useElementPlus } from "../src/plugins/element-plus";
// 导入公共样式
import 'element-plus/dist/index.css'
import "./style/index.scss";

// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

const app = createApp(App);

app.use(store).use(VueI18n).use(router).use(useElementPlus);
await router.isReady();
app.mount("#app");
