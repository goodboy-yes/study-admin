<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { emitter } from "/@/utils/mitt";
import { useRouter, useRoute } from "vue-router";
import { storageSession } from "/@/utils/storage";
import { useAppStoreHook } from "/@/store/modules/app";
import { unref, watch, getCurrentInstance,ref } from "vue";
import globalization from "/@/assets/svg/globalization.svg";
import Screenfull from "../components/screenfull/index.vue";
import Hamburger from "./sidebar/hamBurger.vue";
import Breadcrumb from "./sidebar/breadCrumb.vue";

const appStore = useAppStoreHook();
const router = useRouter();
const route = useRoute();
let usename = storageSession.getItem("info")?.username;
const { locale, t } = useI18n();
let systemLocale = ref(appStore.locale)
watch(
  () => locale.value,
  () => {
    //@ts-ignore
    document.title = t(unref(route.meta.title)); // 动态title
  }
);

function onPanel() {
  emitter.emit("openPanel");
}

function toggleSideBar() {
  appStore.toggleSideBar();
}

// 简体中文
function translationCh() {
  systemLocale.value = "zh";
  locale.value = "zh";
}

// English
function translationEn() {
  systemLocale.value =  "en";
  locale.value = "en";
}
</script>

<template>
  <div class="navbar">
    <Hamburger
      :is-active="appStore.sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <Breadcrumb class="breadcrumb-container" />

    <div class="vertical-header-right">
      <!-- 全屏 -->
      <Screenfull />
      <!-- 国际化 -->
      <el-dropdown trigger="click">
        <globalization />
        <template #dropdown>
          <el-dropdown-menu class="translation">
            <el-dropdown-item
              :style="{
                background: locale === 'zh' ? '#1b2a47' : '',
                color: locale === 'zh' ? '#f4f4f5' : '#000',
              }"
              @click="translationCh"
              >简体中文</el-dropdown-item
            >
            <el-dropdown-item
              :style="{
                background: locale === 'en' ? '#1b2a47' : '',
                color: locale === 'en' ? '#f4f4f5' : '#000',
              }"
              @click="translationEn"
              >English</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 退出登陆 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img
            src="https://img1.baidu.com/it/u=224406960,1347536508&fm=26&fmt=auto"
          />
          <p>Admin</p>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="logout">
            <el-dropdown-item icon="el-icon-switch-button">{{
              $t("message.hsLoginOut")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <i
        class="el-icon-setting"
        :title="$t('message.hssystemSet')"
        @click="onPanel"
      ></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 48px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 48px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .vertical-header-right {
    display: flex;
    min-width: 280px;
    height: 48px;
    align-items: center;
    color: #000000d9;
    justify-content: flex-end;

    .screen-full {
      cursor: pointer;

      &:hover {
        background: #f6f6f6;
      }
    }

    .globalization {
      height: 48px;
      width: 40px;
      padding: 11px;
      cursor: pointer;

      &:hover {
        background: #f6f6f6;
      }
    }

    .el-dropdown-link {
      width: 100px;
      height: 48px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      color: #000000d9;

      &:hover {
        background: #f6f6f6;
      }

      p {
        font-size: 14px;
      }

      img {
        width: 22px;
        height: 22px;
        border-radius: 50%;
      }
    }

    .el-icon-setting {
      height: 48px;
      width: 40px;
      padding: 11px;
      display: flex;
      cursor: pointer;
      align-items: center;

      &:hover {
        background: #f6f6f6;
      }
    }
  }

  .breadcrumb-container {
    float: left;
  }
}

.translation {
  .el-dropdown-menu__item {
    padding: 0 40px !important;
  }

  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    color: #606266;
    background: #f0f0f0;
  }
}

.logout {
  .el-dropdown-menu__item {
    padding: 0 18px !important;
  }

  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    color: #606266;
    background: #f0f0f0;
  }
}
</style>
