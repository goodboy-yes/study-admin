<template>
  <div :class="['app-wrapper', set.classes]">
    <!-- 垂直布局侧边栏 -->
    <Vertical v-show="!hiddenSideBar && set.layout.includes('vertical')" />
    <div :class="['main-container', hiddenSideBar ? 'main-hidden' : '']">
      <div :class="{ 'fixed-header': set.fixedHeader }">
        <!-- 垂直布局顶部导航栏 -->
        <Navbar v-show="!hiddenSideBar && set.layout.includes('vertical')" />
        <!-- 水平布局菜单标签 -->
        <Horizontal v-show="!hiddenSideBar && set.layout.includes('horizontal')" />
        <Tag>
          <span @click="onFullScreen">
            <fullScreen v-if="!hiddenSideBar" />
            <exitScreen v-else />
          </span>
        </Tag>
      </div>
      <!-- 主体内容 -->
      <app-main />
    </div>
    <!-- 系统设置 -->
    <Setting />
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  unref,
  reactive,
  computed,
  onMounted,
  watchEffect,
  onBeforeMount,
  getCurrentInstance,
} from "vue";
import { useSettingStoreHook } from "/@/store/modules/settings";
import { useAppStoreHook } from "/@/store/modules/app";
import { setType } from "./types";
import fullScreen from "/@/assets/svg/full_screen.svg";
import exitScreen from "/@/assets/svg/exit_screen.svg";

import Navbar from "./components/navbar.vue";
import Tag from "./components/tag/index.vue";
import AppMain from "./components/appMain.vue";
import Setting from "./components/setting/index.vue";
import Vertical from "./components/sidebar/vertical.vue";
import Horizontal from "./components/sidebar/horizontal.vue";

const hiddenSideBar = ref(useSettingStoreHook().HiddenSideBar);
const storeSetting = useSettingStoreHook();

const set: setType = reactive({
  sidebar: computed(() => {
    return useAppStoreHook().sidebar;
  }),

  fixedHeader: computed(() => {
    return storeSetting.fixedHeader;
  }),

  classes: computed(() => {
    return {
      hideSidebar: !set.sidebar.opened,
      openSidebar: set.sidebar.opened,
      withoutAnimation: set.sidebar.withoutAnimation,
    };
  }),
  layout: computed(() => {
    return useAppStoreHook().layout;
  }),
});

// 切换显示侧边栏
function onFullScreen() {
  unref(hiddenSideBar)
    ? (hiddenSideBar.value = false)
    : (hiddenSideBar.value = true);
}
</script>

<style lang="scss" scoped>
@mixin clearfix {
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}

.app-wrapper {
  @include clearfix;

  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.main-hidden {
  margin-left: 0 !important;
}

.re-screen {
  margin-top: 12px;
}
</style>
