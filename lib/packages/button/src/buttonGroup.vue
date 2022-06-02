<template>
  <div
    class="mButtonGroup"
    :class="border && 'm-button-group-border'"
    :style="[{ ['--m-button-group-border-color']: color }]"
  >
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
import { LightTheme } from "../../../common/style";

import { getLightColor } from "../../../utils/index";

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
  text?: boolean;
  border?: boolean;
}
const props = withDefaults(defineProps<ButtonProps>(), {
  type: "default",
  disabled: false,
  loading: false,
  shape: "round",
  plain: true,
  size: "small",
  text: false
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
  PLAIN,
  TEXT
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
provide(TEXT, props.text);

const theme = LightTheme[props.type];

const color = props.color ?? theme;
</script>
<style lang="less">
.mButtonGroup {
  display: inline-flex;
  justify-content: space-evenly;
  box-sizing: border-box;
  align-items: center;
  &.m-button-group-border {
    border: 1px var(--m-button-group-border-color) solid;
    .m-button {
      border-width: 0;
      border-right: 1px var(--m-button-group-border-color) solid;
      &:last-of-type {
        border-right: 0px;
      }
    }
  }
}
</style>
