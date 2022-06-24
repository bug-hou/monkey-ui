<template>
  <div class="m-dropdown" :class="'m-dropdwon' + direction">
    <slot></slot>
    <m-dropdown-item
      :options="options"
      class="m-dropdown-item"
      @click="clickHandle"
    ></m-dropdown-item>
  </div>
</template>

<script lang="ts" setup name="m-dropdown">
/*
 * @Author: bughou
 * @Date: 2022-06-20 21:04:45
 * @Description: 创建一个m-dropdown组件
 */
// 从下载的组件中导入函数
import { defineProps } from "vue";
import mDropdownItem from "./dropdownItem.vue";
const props = withDefaults(
  defineProps<{
    options: any[];
    labelName?: string;
    valueName?: string;
    direction?: "left" | "right" | "top" | "bottom";
  }>(),
  {
    direction: "right",
    labelName: "label",
    valueName: "value"
  }
);
function clickHandle(event: Event) {
  console.log((event.target as any).children);
}
</script>
<style scoped lang="less">
.m-dropdown {
  display: inline-block;
  position: relative;
  .m-dropdown-item {
    margin: 5px 0 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
