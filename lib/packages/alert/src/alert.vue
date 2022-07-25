<template>
  <div
    class="m-alert"
    :style="[
      { ['--m-alert-background' as any]: bgColor },
      { ['--m-alert-color' as any]: color }
    ]"
  >
    <div class="m-alert-icon">
      <m-icon :name="iconMap[type]"></m-icon>
    </div>
    <div class="m-alert-title">
      <slot name="title"> </slot>
      <span class="m-alerrt-title-extend" v-if="extend"></span>
    </div>
    <div class="m-alert-body" v-if="!extend">
      <slot></slot>
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
import { getLightColor } from "../../../utils";
import mIcon from "../../icon/src/icon.vue";
import { ref, reactive, defineEmits, defineExpose, defineProps } from "vue";
import { LightTheme } from "../../../common/style";

const iconMap = {
  info: "m-info-empty",
  warn: "m-warning-empty",
  success: "m-success-empty",
  error: "m-error-empty"
};
const props = withDefaults(
  defineProps<{
    extend?: boolean;
    type?: AlertType;
    color?: string;
  }>(),
  {
    type: "info"
  }
);

const color = props.color ?? LightTheme[props.type];
const bgColor = getLightColor(color, 0.7);
</script>
<style scoped lang="less">
.m-alert {
  color: var(--m-alert-color);
  background-color: var(--m-alert-background);
  position: relative;
  padding: 8px;
  padding-left: 30px;
  font-size: 14px;
  .m-alert-icon {
    position: absolute;
    left: 18px;
    transform: translate(-50%, -3px);
    font-size: 18px;
    font-weight: bold;
    height: 26px;
  }
  .m-alert-title {
    font-weight: bold;
    .m-alerrt-title-extend {
      position: absolute;
      right: 10px;
      border: 10px solid transparent;
      border-top-color: var(--m-alert-color);
    }
  }
}
</style>
