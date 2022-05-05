<template>
  <span
    class="icon iconfont"
    :class="[name, size]"
    :style="{
      ['--color']: hoverColor
    }"
  ></span>
</template>

<script lang="ts" setup name="mIcon">
/*
 * @Author: bughou
 * @Date: 2022-05-01 20:19:22
 * @Description: 创建一个icon组件
 */
// 从下载的组件中导入函数
import { defineProps, inject, withDefaults } from "vue";
import { LightTheme } from "../../../common/style";
import { useInject } from "../../../hooks";
import IconNames from "../config";
import type {
  Size as IconSize,
  Type as IconType
} from "../../../type/index.type";
const props = withDefaults(
  defineProps<{
    name: string;
    size?: IconSize;
    color?: string;
    type?: IconType;
  }>(),
  {}
);
const { TYPE, SIZE, COLOR, HOVER_COLOR } = IconNames;
const type = useInject(props.type, TYPE, "info");
const size = useInject(props.size, SIZE, "small");
const theme = LightTheme[type];
const color = useInject(props.color, COLOR, theme);
const hoverColor = inject(HOVER_COLOR, color);
</script>
<style scoped lang="less">
.icon {
  display: inline-block;
  color: var(--color);
  cursor: pointer;
  text-align: center;
}
.mini {
  font-size: 12px;
}
.small {
  font-size: 14px;
}
.medium {
  font-size: 16px;
}
.big {
  font-size: 28px;
}
</style>
