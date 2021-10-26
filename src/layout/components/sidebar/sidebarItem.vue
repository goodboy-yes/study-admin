<script setup lang="ts">
import { PropType, ref } from "vue";
import { childrenType } from "/@/layout/types";

const props = defineProps({
  item: {
    type: Object as PropType<childrenType>,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
});

const onlyOneChild: childrenType = ref(null);

function hasOneShowingChild(
  children: childrenType[] = [],
  parent: childrenType
) {
  const showingChildren = children.filter((item: any) => {
    onlyOneChild.value = item;
    return true;
  });

  if (showingChildren.length === 1) {
    return true;
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }
  return false;
}
</script>

<template>
  <template
    v-if="
      hasOneShowingChild(props.item.children, props.item) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren)
    "
  >
    <el-menu-item
      :index="onlyOneChild.path || props.basePath"
      :class="{ 'submenu-title-noDropdown': !isNest }"
    >
      <template #title>
        <i
          :class="
            onlyOneChild.meta.icon || (props.item.meta && props.item.meta.icon)
          "
        />
        <span>{{ $t(onlyOneChild.meta.title) }}</span>
      </template>
    </el-menu-item>
  </template>

  <el-sub-menu v-else ref="subMenu" :index="props.item.path" popper-append-to-body>
    <template #title>
      <i :class="props.item.meta.icon"></i>
      <span>{{ $t(props.item.meta.title) }}</span>
    </template>
    <sidebar-item
      v-for="child in props.item.children"
      :key="child.path"
      :is-nest="true"
      :item="child"
      :base-path="child.path"
      class="nest-menu"
    />
  </el-sub-menu>
</template>
