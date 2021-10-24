import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "/@/store";
import VueI18n from "../src/plugins/i18n";
import { useElementPlus } from "../src/plugins/element-plus";
// 导入公共样式
import "./style/index.scss";

// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

const app = createApp(App);

const config = {
  Version: "2.0.0",
  Title: "PureAdmin",
  FixedHeader: true,
  HiddenSideBar: false,
  KeepAlive: true,
  Locale: "zh",
  Layout: "vertical-dark",
  MapConfigure: {
    amapKey: "97b3248d1553172e81f168cf94ea667e",
    baiduKey: "wTHbkkEweiFqZLKunMIjcrb2RcqNXkhc",
    options: {
      resizeEnable: true,
      center: [113.6401, 34.72468],
      zoom: 12,
    },
  },
};

app.config.globalProperties.$config = config;
app.config.globalProperties.$storage = {
  // 默认显示首页tag
  routesInStorage: [
    {
      path: "/welcome",
      parentPath: "/",
      meta: {
        title: "message.hshome",
        icon: "el-icon-s-home",
        showLink: true,
      },
    },
  ],
  // 国际化 默认中文zh
  locale: {
    locale: config.Locale,
  },
  // layout模式以及主题
  layout: {
    layout: config.Layout,
  },
};

app.use(store).use(VueI18n).use(router).use(useElementPlus);
await router.isReady();
app.mount("#app");
