<template>
  <div class="mIconGroup">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="mIconGroup">
/*
 * @Author: bughou
 * @Date: 2022-05-02 18:17:33
 * @Description: 创建一个mIconGroup组件
 */
// 从下载的组件中导入函数
import { defineProps, withDefaults, provide } from "vue";
import type {
  Size as IconSize,
  Type as IconType,
  Shape as IconShape
} from "../../../type/index.type";
import IconNames from "../config";
const props = withDefaults(
  defineProps<{
    size?: IconSize;
    color?: string;
    plain?: boolean;
    type?: IconType;
    glass?: boolean;
    shape?: IconShape;
  }>(),
  {
    size: "small",
    plain: true,
    glass: false,
    type: "default"
  }
);
const { SHAPE, SIZE, TYPE, COLOR, PLAIN } = IconNames;
provide(SIZE, props.size);
provide(PLAIN, props.plain);
provide(TYPE, props.type);
provide(SHAPE, props.shape);
provide("glass", props.glass);
provide(COLOR, props.color);
</script>
<style scoped lang="less"></style>
