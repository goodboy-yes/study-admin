import { UserConfigExport, ConfigEnv, loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import svgLoader from 'vite-svg-loader'
// https://vitejs.dev/config/

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
      svgLoader(),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  };
};
