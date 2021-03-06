import { defineStore } from "pinia";
import { store } from "/@/store";
import { storageLocal } from "/@/utils/storage";
import { getCurrentInstance } from "vue";
import { RouteRecordName } from "vue-router";
import { RouteConfigs } from "/@/layout/types";

interface AppState {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  layout: string;
  cachePageList: any[];
  KeepAlive:boolean,
  locale:string,
  routesInStorage:RouteConfigs[]
}

type cacheType = {
  mode: string;
  name?: RouteRecordName;
};
export const useAppStore = defineStore({
  id: "store-app",
  state: (): AppState => {
    return {
      layout:'vertical',
      sidebar: {
        opened: storageLocal.getItem("sidebarStatus")
          ? !!+storageLocal.getItem("sidebarStatus")
          : true,
        withoutAnimation: false,
      },
      // 缓存页面keepAlive
      cachePageList: [],
      KeepAlive:true,
      locale:'zh',
      routesInStorage:[
        {
          path: "/welcome",
          parentPath: "/",
          meta: {
            title: "message.hshome",
            icon: "el-icon-s-home",
            showLink: true,
          },
        },
      ]
    };
  },
  getters: {
    getSidebarStatus(): boolean {
      return this.sidebar.opened;
    },
    getLayout(): string {
      return this.layout;
    },
  },
  actions: {
    TOGGLE_SIDEBAR() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        storageLocal.setItem("sidebarStatus", 1);
      } else {
        storageLocal.setItem("sidebarStatus", 0);
      }
    },
    CLOSE_SIDEBAR(withoutAnimation: boolean) {
      storageLocal.setItem("sidebarStatus", 0);
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    async toggleSideBar() {
      await this.TOGGLE_SIDEBAR();
    },
    closeSideBar(withoutAnimation) {
      this.CLOSE_SIDEBAR(withoutAnimation);
    },
    setLayout(layout) {
      this.layout = layout;
    },
    cacheOperate({ mode, name }: cacheType) {
      switch (mode) {
        case "add":
          this.cachePageList.push(name);
          this.cachePageList = [...new Set(this.cachePageList)];
          break;
        case "delete":
          // eslint-disable-next-line no-case-declarations
          const delIndex = this.cachePageList.findIndex((v) => v === name);
          delIndex !== -1 && this.cachePageList.splice(delIndex, 1);
          break;
      }
    },
    // 清空缓存页面
    clearAllCachePage() {
      this.cachePageList = [];
    },
  },
});

export function useAppStoreHook() {
  return useAppStore(store);
}
