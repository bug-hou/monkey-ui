<template>
  <div class="mButtonGroup">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="mButtonGroup">
/*
 * @Author: bughou
 * @Date: 2022-04-30 16:10:51
 * @Description: 创建一个mButtonGroup组件
 */
// 从下载的组件中导入函数
import { defineProps, provide } from "vue";
type ButtonType =
  | "success"
  | "error"
  | "info"
  | "primary"
  | "warning"
  | "default";

type ButtonShape = "rect" | "round" | "arc" | "circle";

type ButtonSize = "medium" | "small" | "mini";

interface ButtonProps {
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  shape?: ButtonShape;
  plain?: boolean;
  size?: ButtonSize;
  color?: string;
  hoverColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
}
const props = withDefaults(defineProps<ButtonProps>(), {
  type: "default",
  disabled: false,
  loading: false,
  shape: "rect",
  plain: true,
  size: "small"
});
provide("type", props.type);
provide("disabled", props.disabled);
provide("loading", props.loading);
provide("shape", props.shape);
provide("plain", props.plain);
provide("size", props.size);
provide("color", props.color);
provide("hoverColor", props.hoverColor);
provide("borderColor", props.borderColor);
provide("backgroundColor", props.backgroundColor);
provide("hoverBackgroundColor", props.hoverBackgroundColor);
</script>
<style scoped lang="less">
.mButtonGroup {
  display: flex;
  justify-content: space-evenly;
}
</style>
