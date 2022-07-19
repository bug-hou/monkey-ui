<template>
  <div
    class="m-menu-content"
    :class="[
      expand && 'm-menu-content-expand',
      level === 1 && collapsed && 'm-menu-content-collapse'
    ]"
    ref="menuContentRef"
    :style="[{ ['--menu-content-height']: allHeight + 'px' }]"
  >
    <div v-if="level === 1 && collapsed" style="width: 100%">
      <m-dropdown
        :options="options.children"
        :label-name="labelName"
        :value-name="valueName"
        :icon-name="iconName"
        direction="right"
        style="width: 100%"
      >
        <div class="m-menu-content-title">
          <m-icon v-if="options[iconName]" :name="options[iconName]"></m-icon>
          <span>{{ options[labelName] }}</span>
          <m-icon class="m-menu-content-icon" name="m-right"></m-icon>
        </div>
      </m-dropdown>
    </div>
    <div v-else>
      <div class="m-menu-content-title" @click="clickHandle">
        <m-icon v-if="options[iconName]" :name="options[iconName]"></m-icon>
        <span>{{ options[labelName] }}</span>
        <m-icon
          class="m-menu-content-icon"
          :class="expand && 'm-menu-content-icon-expand'"
          name="m-right"
        ></m-icon>
      </div>
      <ul ref="contentRef">
        <component
          v-for="item in options.children"
          :key="item[valueName]"
          :is="item.children ? menuSubItemVue : menuItemVue"
          :level="level + 1"
          :options="item"
        ></component>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup name="m-menu-content">
/*
 * @Author: bughou
 * @Date: 2022-07-18 20:43:06
 * @Description: 创建一个m-menu-content组件
 */
// 从下载的组件中导入函数
import mDropdown from "../../dropdown/src/dropdown.vue";
import mIcon from "../../icon/src/icon.vue";
import menuItemVue from "./menu-item.vue";
import menuSubItemVue from "./menu-sub-item.vue";
import { ref, defineProps, onMounted } from "vue";
import { useInject } from "../../../hooks";
const props = withDefaults(
  defineProps<{
    options: any;
    level: number;
  }>(),
  {}
);

const labelName = useInject(undefined, "labelName", "label");
const valueName = useInject(undefined, "valueName", "value");
const iconName = useInject(undefined, "iconName", "icon");
const itemHeight = useInject(undefined, "itemHeight", 40);

const collapsed = useInject(undefined, "collapsed", ref(false));

const expand = ref(false);
const allHeight = ref(0);
const contentRef = ref<HTMLUListElement>();
const menuContentRef = ref<HTMLElement>();

function clickHandle() {
  expand.value = !expand.value;
}
defineExpose({
  allHeight
});
onMounted(() => {
  if (contentRef.value) {
    let maxHeight = itemHeight;
    const len = contentRef.value.children.length;
    console.log("first");
    for (let i = 0; i < len; i++) {
      const element = contentRef.value.children[i] as HTMLLIElement;
      maxHeight += +(element?.dataset.height ?? 0);
    }
    allHeight.value = maxHeight;
    console.log(maxHeight);
    if (menuContentRef.value) {
      menuContentRef.value.dataset.height = String(maxHeight);
    }
  }
});
</script>
<style scoped lang="less">
.m-menu-content {
  width: 100%;
  max-height: var(--menu-item-height);
  transition: all 0.5s;
  overflow: hidden;
  &.m-menu-content-expand {
    max-height: var(--menu-content-height);
  }
  &.m-menu-content-collapse {
    overflow: visible;
  }
  .m-menu-content-title {
    width: 100%;
    height: var(--menu-item-height);
    display: flex;
    gap: 10px;
    align-items: center;
    position: relative;
    cursor: pointer;
    .m-menu-content-icon {
      transition: all 0.5s;
      transform: translateY(-50%);
      position: absolute;
      top: calc(var(--menu-item-height) / 2);
      right: 10px;
      &.m-menu-content-icon-expand {
        transform: translateY(-50%) rotate(90deg);
      }
    }
  }
}
</style>
