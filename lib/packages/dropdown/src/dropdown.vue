<template>
  <div class="m-dropdown" @mouseenter="enterHandle" @mouseleave="leaveHandle">
    <div @click="clickHandle">
      <slot></slot>
    </div>
    <transition name="fade">
      <m-dropdown-item
        v-show="isShow"
        :options="options"
        :class="'m-dropdown-item-' + direction"
        @hidden="hiddenHandle"
        :defaultValue="defaultValue"
        :value-name="valueName"
        :label-name="labelName"
      ></m-dropdown-item>
    </transition>
  </div>
</template>

<script lang="ts" setup name="m-dropdown">
/*
 * @Author: bughou
 * @Date: 2022-06-20 21:04:45
 * @Description: 创建一个m-dropdown组件
 */
// 从下载的组件中导入函数
import { defineProps, ref, unref } from "vue";
import mDropdownItem from "./dropdownItem.vue";
const props = withDefaults(
  defineProps<{
    options: any[];
    labelName?: string;
    valueName?: string;
    direction?: "left" | "right" | "top" | "bottom";
    trigger?: "click" | "hover";
    defaultValue?: any[];
  }>(),
  {
    direction: "right",
    labelName: "label",
    valueName: "value",
    trigger: "hover"
  }
);

const emits = defineEmits<{
  (e: "select", option: any): void;
}>();

const isShow = ref(false);
function clickHandle() {
  if (props.trigger === "click") {
    isShow.value = !unref(isShow);
  }
}
function hiddenHandle(option) {
  isShow.value = false;
  emits("select", option);
}
function enterHandle() {
  if (props.trigger === "hover") {
    isShow.value = true;
  }
}
function leaveHandle() {
  if (props.trigger === "hover") {
    isShow.value = false;
  }
}
</script>
<style scoped lang="less">
.fade-leave-from,
.fade-enter-to {
  scale: 1;
  opacity: 1;
}
.fade-leave-active,
.fade-enter-active {
  transition: all 0.3s;
  transform-origin: 0 0;
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
  scale: 0;
}
.m-dropdown {
  display: inline-block;
  position: relative;
  .m-dropdown-item-top {
    margin-bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    bottom: 100%;
  }
  .m-dropdown-item-right {
    left: 100%;
    top: 0;
    margin-left: 5px;
    transform: none;
  }
  .m-dropdown-item-bottom {
    margin-top: 5px;
    left: 50%;
    transform: translateX(-50%);
  }
  .m-dropdown-item-left {
    right: 100%;
    margin-right: 5px;
    transform: none;
  }
}
</style>
