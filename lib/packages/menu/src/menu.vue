<template>
  <div
    class="m-menu"
    :class="collapse && 'm-menu-collapse'"
    :style="[
      { ['--menu-item-height']: itemHeight + 'px' },
      { ['--menu-icon-color']: iconColor },
      { ['--menu-icon-size']: processUnit(iconSize) },
      { ['--menu-item-color']: itemColor },
      {
        color
      }
    ]"
  >
    <slot name="title">
      <menu-title-vue
        :title="capture"
        :icon="icon"
        @click="clickHandle"
      ></menu-title-vue>
    </slot>
    <ul v-for="item in options" :key="item[valueName]">
      <component
        :is="item.children ? menuContentVue : menuItemVue"
        @checkValue="checkValueHandle"
        :options="item"
        :level="1"
      ></component>
    </ul>
  </div>
</template>

<script lang="ts" setup name="m-menu">
/*
 * @Author: bughou
 * @Date: 2022-07-18 19:49:33
 * @Description: 创建一个m-menu组件
 */
// 从下载的组件中导入函数
import { processProvides } from "../utils/provides";
import menuTitleVue from "./menu-title.vue";
import menuContentVue from "./menu-content.vue";
import menuItemVue from "./menu-item.vue";
import { useRouter } from "vue-router";
import { ref, defineProps, withDefaults, unref, watch } from "vue";
import { processUnit } from "../../../hooks";
const props = withDefaults(
  defineProps<{
    capture?: string;
    icon?: string;
    options?: any[];
    labelName?: string;
    valueName?: string;
    iconName?: string;
    itemHeight?: number | string;
    showValue?: string[];
    iconColor?: string;
    iconSize?: string | number;
    color?: string;
    itemColor?: string;
    isCollapse?: boolean;
    collapse?: boolean;
    navigator?: (path: string) => void;
  }>(),
  {
    labelName: "label",
    valueName: "value",
    iconName: "icon",
    itemHeight: 40,
    iconColor: "#666",
    iconSize: 20,
    itemColor: "#666",
    color: "#000",
    collapse:false,
    isCollapse: false
  }
);
const router = useRouter();

const showValue = ref(props.showValue ?? []);

const collapse = ref(false);
const accordion = ref(false);

const provideValue = [
  ["labelName", props.labelName],
  ["valueName", props.valueName],
  ["iconName", props.iconName],
  ["itemHeight", props.itemHeight],
  ["showValue", showValue],
  ["navigator", props.navigator ?? navigatorHandle],
  ["collapse", collapse],
  ["accordion", accordion]
] as any;

processProvides(provideValue);

function setAccordion() {
  accordion.value = !unref(accordion);
}

function clickHandle() {
  if (props.isCollapse) {
    collapse.value = !unref(collapse);
  }
}

if(props.isCollapse){
  watch(()=>props.collapse,(newValue)=>{
    collapse.value = newValue;
  })
}

function checkValueHandle(values: string[], level: number) {
  if (level === 1) {
    showValue.value = values;
    setAccordion();
  }
}
function navigatorHandle(path: string) {
  router.push(path);
}
</script>
<style scoped lang="less">
.m-menu {
  width: 150px;
  transition: width 0.5s;
  &.m-menu-collapse {
    width: 50px;
  }
}
</style>
