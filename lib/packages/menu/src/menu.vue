<template>
  <div class="m-menu" :style="[{ ['--menu-item-height']: itemHeight + 'px' }]">
    <slot name="title">
      <menu-title-vue :title="title" :icon="iconTitle"></menu-title-vue>
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
import {
  ref,
  reactive,
  defineEmits,
  defineExpose,
  defineProps,
  withDefaults
} from "vue";
const props = withDefaults(
  defineProps<{
    title?: string;
    iconTitle?: string;
    options?: any[];
    labelName?: string;
    valueName?: string;
    itemHeight?: number | string;
    showValue?: string[];
    navigator?: (path: string) => void;
  }>(),
  {
    labelName: "label",
    valueName: "value",
    itemHeight: 40,
    navigator: (path: string) => {
      const router = useRouter();
      router.push(path);
    }
  }
);

const showValue = ref(props.showValue ?? []);

const collapse = ref(true);

const provideValue = [
  ["labelName", props.labelName],
  ["valueName", props.valueName],
  ["iconName", props.iconTitle],
  ["itemHeight", props.itemHeight],
  ["showValue", showValue],
  ["navigator", props.navigator],
  ["collapse", collapse]
] as any;

processProvides(provideValue);

// function changeValue(value:string[]) {
//   showValue
// }

function checkValueHandle(values: string[], level: number) {
  if (level === 1) {
    showValue.value = values;
  }
}
</script>
<style scoped lang="less">
.m-menu {
  width: 120px;
}
</style>
