<template>
  <div class="m-dropdown" @mouseenter="enterHandle" @mouseleave="leaveHandle">
    <div @click.stop="clickHandle">
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
        @mouseenter="enterHandle"
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
import { defineProps, onMounted, ref, unref } from "vue";
import mDropdownItem from "./dropdownItem.vue";
const props = withDefaults(
  defineProps<{
    options: any[];
    labelName?: string;
    valueName?: string;
    direction?: "left" | "right" | "top" | "bottom";
    trigger?: "click" | "hover" | "auto";
    defaultValue?: any[];
    iconName?: string;
  }>(),
  {
    direction: "bottom",
    labelName: "label",
    valueName: "value",
    trigger: "hover",
    iconName: "icon"
  }
);

const emits = defineEmits<{
  (e: "select", option: any, values: string[]): void;
}>();

const isShow = ref(false);
function clickHandle() {
  if (props.trigger !== "hover") {
    isShow.value = !unref(isShow);
  }
}
function hiddenHandle(option, values: string[]) {
  isShow.value = false;
  emits("select", option, values);
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
if (props.trigger === "auto") {
  window.addEventListener("click", () => {
    isShow.value = false;
  });
}
</script>
<style scoped lang="less">
.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}
.fade-leave-active,
.fade-enter-active {
  transition: all 0.3s;
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
.m-dropdown {
  display: inline-block;
  position: relative;
  .m-dropdown-item-top {
    left: 50%;
    transform: translateX(-50%);
    bottom: 100%;
  }
  .m-dropdown-item-right {
    left: 100%;
    top: 0;
    transform: none;
  }
  .m-dropdown-item-bottom {
    left: 50%;
    transform: translateX(-50%);
  }
  .m-dropdown-item-left {
    right: 100%;
    transform: none;
    top: 0;
  }
}
</style>

