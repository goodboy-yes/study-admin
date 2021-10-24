<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
export default {
  name: "app",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  computed: {
    currentLocale() {
      return zhCn;
      // switch (this.$storage.locale?.locale) {
      //   case "zh":
      //     return zhCn;
      //   case "en":
      //     return en;
      // }
    },
  },
};
</script>
