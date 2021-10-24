import { defineStore } from "pinia";
import { store } from "/@/store";
import { getCurrentInstance } from "vue";
interface SettingState {
  title: string;
  fixedHeader: boolean;
}

export const useSettingStore = defineStore({
  id: "store-setting",
  state: (): SettingState => ({
    title:
      getCurrentInstance()!.appContext.config.globalProperties.$config?.Title,
    fixedHeader:
      getCurrentInstance()!.appContext.config.globalProperties.$config
        ?.FixedHeader,
  }),
  getters: {
    getTitle(): string {
      return this.title;
    },
    getFixedHeader(): boolean {
      return this.fixedHeader;
    },
  },
  actions: {
    CHANGE_SETTING({ key, value }) {
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    },
    changeSetting(data) {
      this.CHANGE_SETTING(data);
    },
  },
});

export function useSettingStoreHook() {
  return useSettingStore(store);
}
