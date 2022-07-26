<template>
  <div
    v-if="close"
    class="m-alert"
    :style="[
      { ['--m-alert-background' as any]: bgColor },
      { ['--m-alert-color' as any]: color },
      { ['--m-alert-title-color' as any]: titleColor}
    ]"
  >
    <div class="m-alert-icon">
      <m-icon :name="iconMap[type]"></m-icon>
    </div>
    <div v-if="props.close" class="m-alert-close" @click="closeHandle">
      <m-icon name="m-cha"></m-icon>
    </div>
    <div class="m-alert-title">
      <slot name="title"> </slot>
    </div>
    <div class="m-alert-body">
      <slot></slot>
    </div>
    <div v-if="visibleBody">
      <slot name="extend"></slot>
    </div>
    <div class="m-alert-extend" v-if="extend" @click="clickHandle">
      <span>展开</span>
      <span
        class="m-alert-signal-extend"
        :class="visibleBody && 'm-alert-signal-extend-active'"
      ></span>
    </div>
    <div class="m-alert-footet"></div>
  </div>
</template>

<script lang="ts" setup name="m-alert">
/*
 * @Author: bughou
 * @Date: 2022-07-23 19:32:49
 * @Description: 创建一个m-alert组件
 */
// 从下载的组件中导入函数
import { AlertType } from "../config/alert";
import { getLightColor, getDarkColor } from "../../../utils";
import mIcon from "../../icon/src/icon.vue";
import { ref, reactive, defineEmits, unref, defineProps, watch } from "vue";
import { LightTheme } from "../../../common/style";

const iconMap = {
  info: "m-info-empty",
  default: "m-info-empty",
  primary: "m-info-empty",
  warning: "m-warning-empty",
  success: "m-success-empty",
  error: "m-error-empty"
};

const props = withDefaults(
  defineProps<{
    extend?: boolean;
    type?: AlertType;
    color?: string;
    close?: boolean;
  }>(),
  {
    type: "default",
    extend: false,
    close: true
  }
);

watch(
  () => props.close,
  (newValue) => {
    close.value = newValue;
  }
);

const color = props.color ?? LightTheme[props.type];
const bgColor = getLightColor(color, 0.8);
const titleColor = getDarkColor(color);
const close = ref(props.close);

const visibleBody = ref(!props.extend);

function clickHandle() {
  if (props.extend) {
    visibleBody.value = !unref(visibleBody);
  }
}
function closeHandle() {
  close.value = false;
}
</script>
<style scoped lang="less">
.m-alert {
  color: var(--m-alert-color);
  background-color: var(--m-alert-background);
  position: relative;
  padding: 10px;
  padding-left: 50px;
  font-size: 14px;
  .m-alert-icon {
    position: absolute;
    left: 28px;
    transform: translate(-50%, -3px);
    font-size: 18px;
    font-weight: bold;
    height: 26px;
    color: var(--m-alert-color);
  }
  .m-alert-close {
    position: absolute;
    right: 8px;
    cursor: pointer;
    transform: translate(-50%, -3px);
  }
  .m-alert-title {
    font-weight: bold;
    color: var(--m-alert-title-color);
    &:empty + .m-alert-body {
      padding-top: 0px;
    }
  }
  .m-alert-extend {
    display: flex;
    align-items: center;
    font-size: 14px;
    gap: 5px;
    .m-alert-signal-extend {
      border: 6px solid transparent;
      border-top-color: var(--m-alert-title-color);
      cursor: pointer;
      transform-origin: center 4px;
      transform: translateY(4px);
      &.m-alert-signal-extend-active {
        transform: translateY(4px) rotate(180deg);
      }
    }
  }
  .m-alert-body {
    padding-top: 8px;
  }
}
</style>
