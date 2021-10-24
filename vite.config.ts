import { UserConfigExport, ConfigEnv, loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
// 使用 defineConfig 工具函数，这样不用 jsdoc 注解也可以获取类型提示
// export default defineConfig({
//   plugins: [vue()]
// })
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    resolve: {
      alias: {
        "/@": pathResolve("src"),
      },
    },
    plugins: [
      vue(),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  };
};
