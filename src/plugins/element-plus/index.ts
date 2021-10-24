import { App } from "vue";
import { ElLoading } from "element-plus";

const plugins = [ElLoading];

export function useElementPlus(app: App) {
  plugins.forEach((plugin) => {
    app.use(plugin);
  });
}
