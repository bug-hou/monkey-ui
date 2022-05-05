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
import type { ButtonType, ButtonShape, ButtonSize } from "./button";
import ButtonNames from "../config";

interface ButtonProps {
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  shape?: ButtonShape;
  plain?: boolean;
  size?: ButtonSize;
  color?: string;
  textColor?: string;
  borderColor?: string;
}
const props = withDefaults(defineProps<ButtonProps>(), {
  type: "default",
  disabled: false,
  loading: false,
  shape: "rect",
  plain: true,
  size: "small"
});
const {
  TEXT_COLOR,
  TYPE,
  SHAPE,
  SIZE,
  LOADING,
  DISABLED,
  BORDER_COLOR,
  COLOR,
  PLAIN
} = ButtonNames;
provide(TYPE, props.type);
provide(DISABLED, props.disabled);
provide(LOADING, props.loading);
provide(SHAPE, props.shape);
provide(PLAIN, props.plain);
provide(SIZE, props.size);
provide(COLOR, props.color);
provide(BORDER_COLOR, props.borderColor);
provide(TEXT_COLOR, props.textColor);
</script>
<style scoped lang="less">
.mButtonGroup {
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  box-sizing: border-box;
  align-items: center;
}
</style>
