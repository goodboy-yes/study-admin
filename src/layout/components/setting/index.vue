<script setup lang="ts">
import { split } from "lodash-es";
import Panel from "../panel/index.vue";
import { useRouter } from "vue-router";
import { emitter } from "/@/utils/mitt";
import { templateRef, useCssVar } from "@vueuse/core";
import { debounce } from "/@/utils";
import { useAppStoreHook } from "/@/store/modules/app";
import { storageLocal, storageSession } from "/@/utils/storage";
import { storeToRefs } from 'pinia'
import {
  reactive,
  ref,
  unref,
  watch,
  useCssModule,
} from "vue";

const router = useRouter();
const { isSelect } = useCssModule();

// 默认灵动模式
const markValue = ref(storageLocal.getItem("showModel") || "smart");

const logoVal = ref(storageLocal.getItem("logoVal") || "1");

const localOperate = (key: string, value?: any, model?: string): any => {
  model && model === "set"
    ? storageLocal.setItem(key, value)
    : storageLocal.getItem(key);
};

const settings = reactive({
  greyVal: storageLocal.getItem("greyVal"),
  weekVal: storageLocal.getItem("weekVal"),
  tagsVal: storageLocal.getItem("tagsVal"),
});

settings.greyVal === null
  ? localOperate("greyVal", false, "set")
  : document.querySelector("html")?.setAttribute("class", "html-grey");

settings.weekVal === null
  ? localOperate("weekVal", false, "set")
  : document.querySelector("html")?.setAttribute("class", "html-weakness");

function toggleClass(flag: boolean, clsName: string, target?: HTMLElement) {
  const targetEl = target || document.body;
  let { className } = targetEl;
  className = className.replace(clsName, "");
  targetEl.className = flag ? `${className} ${clsName} ` : className;
}

// 灰色模式设置
const greyChange = ({ value }): void => {
  toggleClass(settings.greyVal, "html-grey", document.querySelector("html"));
  value
    ? localOperate("greyVal", true, "set")
    : localOperate("greyVal", false, "set");
};

// 色弱模式设置
const weekChange = ({ value }): void => {
  toggleClass(
    settings.weekVal,
    "html-weakness",
    document.querySelector("html")
  );
  value
    ? localOperate("weekVal", true, "set")
    : localOperate("weekVal", false, "set");
};

const tagsChange = () => {
  let showVal = settings.tagsVal;
  showVal
    ? storageLocal.setItem("tagsVal", true)
    : storageLocal.setItem("tagsVal", false);
  emitter.emit("tagViewsChange", showVal);
};

function onChange(value) {
  storageLocal.setItem("showModel", value);
  emitter.emit("tagViewsShowModel", value);
}

const verticalDarkDom = templateRef<HTMLElement | null>(
  "verticalDarkDom",
  null
);
const horizontalDarkDom = templateRef<HTMLElement | null>(
  "horizontalDarkDom",
  null
);
const store = useAppStoreHook()
const { layout:systemLayout } = storeToRefs(store)

if (unref(systemLayout)) {
  // 设置导航模式
  window.document.body.setAttribute("data-layout", unref(systemLayout));
}

// 侧边栏Logo
function logoChange() {
  unref(logoVal) === "1"
    ? storageLocal.setItem("logoVal", "1")
    : storageLocal.setItem("logoVal", "-1");
  emitter.emit("logoChange", unref(logoVal));
}

function setFalse(Doms): any {
  Doms.forEach((v) => {
    toggleClass(false, isSelect, unref(v));
  });
}

watch(systemLayout, (layout) => {
  switch (layout["layout"]) {
    case "vertical":
      toggleClass(true, isSelect, unref(verticalDarkDom));
      debounce(
        setFalse([horizontalDarkDom]),
        50
      );
      break;
    case "horizontal":
      toggleClass(true, isSelect, unref(horizontalDarkDom));
      debounce(
        setFalse([verticalDarkDom]),
        50
      );
      break;
  }
});

function setTheme(layout: string) {
  window.document.body.setAttribute("data-layout", layout);
  useAppStoreHook().setLayout(layout);
}

const changeMainColor = (e, val) => {
  document.documentElement.style.setProperty(val, e.target.value);
}
</script>

<template>
  <Panel>
    <el-divider>主题风格</el-divider>
    <ul class="theme-stley">
      <li
        :class="systemLayout === 'vertical' ? $style.isSelect : ''"
        ref="verticalDarkDom"
        @click="setTheme('vertical')"
      >
        <div></div>
        <div></div>
      </li>
      <li
        :class="
          systemLayout === 'horizontal' ? $style.isSelect : ''
        "
        ref="horizontalDarkDom"
        @click="setTheme('horizontal')"
      >
        <div></div>
        <div></div>
      </li>
      <div class="selectColor">
        <span>主色：</span>
        <input type="color" @change="(e) => { changeMainColor(e, '--main-color') }" />
      </div>
      <div class="selectColor">
        <span>辅色：</span>
        <input type="color" @change="(e) => { changeMainColor(e, '--auxiliary-color') }" />
      </div>
      <div class="selectColor">
        <span>导航栏文字色：</span>
        <input type="color" @change="(e) => { changeMainColor(e, '--text-color') }" />
      </div>
    </ul>

    <el-divider>界面显示</el-divider>
    <ul class="setting">
      <li>
        <span>灰色模式</span>
        <el-switch v-model="settings.greyVal" @change="greyChange" />
      </li>
      <li>
        <span>色弱模式</span>
        <el-switch v-model="settings.weekVal" @change="weekChange" />
      </li>
      <li>
        <span>隐藏标签页</span>
        <el-switch v-model="settings.tagsVal" @change="tagsChange" />
      </li>
      <li>
        <span>侧边栏Logo</span>
        <el-switch v-model="logoVal" @change="logoChange" />
      </li>
      <li>
        <span>标签风格</span>
        <el-radio-group v-model="markValue" @change="onChange">
          <el-radio label="card">卡片</el-radio>
          <el-radio label="smart">灵动</el-radio>
        </el-radio-group>
      </li>
    </ul>
    <el-divider />
  </Panel>
</template>

<style scoped module>
.isSelect {
  border: 2px solid #0960bd;
}
</style>

<style lang="scss" scoped>
.setting {
  width: 100%;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 25px;
  }
}

:deep(.el-divider__text) {
  font-size: 16px;
  font-weight: 700;
}

.theme-stley {
  margin-top: 25px;
  width: 100%;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  li {
    margin: 10px;
    width: 36%;
    height: 70px;
    background: #f0f2f5;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

    &:nth-child(1) {
      div {
        &:nth-child(1) {
          width: 30%;
          height: 100%;
          box-shadow: 0 0 1px #888;
          background: #fff;
          border-radius: 4px 0 0 4px;
        }

        &:nth-child(2) {
          width: 70%;
          height: 30%;
          top: 0;
          right: 0;
          background: #fff;
          box-shadow: 0 0 1px #888;
          position: absolute;
        }
      }
    }

    &:nth-child(2) {
      div {
        &:nth-child(1) {
          width: 100%;
          height: 30%;
          background: #fff;
          box-shadow: 0 0 1px #888;
        }
      }
    }
  }
  .selectColor {
    width: 100%;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
