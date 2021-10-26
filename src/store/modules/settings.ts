import { defineStore } from "pinia";
import { store } from "/@/store";
interface SettingState {
  title: string;
  fixedHeader: boolean;
  HiddenSideBar: boolean;
}

export const useSettingStore = defineStore({
  id: "store-setting",
  state: (): SettingState => ({
    title:"Vue3Admin",
    fixedHeader:true,
    HiddenSideBar:false
  }),
  getters: {
    getTitle(): string {
      return this.title;
    },
    getFixedHeader(): boolean {
      return this.fixedHeader;
    },
    getHiddenSideBar(): boolean {
      return this.HiddenSideBar;
    },
  },
  actions: {
    changeSetting({ key, value }) {
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    }
  },
});

export function useSettingStoreHook() {
  return useSettingStore(store);
}
