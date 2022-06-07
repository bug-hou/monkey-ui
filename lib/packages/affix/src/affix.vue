<template>
  <div
    class="m-affix"
    :style="[
      { top: processUnit(top) },
      { left: processUnit(left) },
      { bottom: processUnit(bottom) }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="m-affix">
/*
 * @Author: bughou
 * @Date: 2022-06-07 17:25:14
 * @Description: 创建一个m-affix组件
 */
// 从下载的组件中导入函数
import { defineProps, withDefaults } from "vue";
import { processUnit } from "../../../hooks";
const props = withDefaults(
  defineProps<{
    top?: number | string;
    left?: number | string;
    bottom?: number | string;
  }>(),
  {
    left: 0,
    bottom: "auto"
  }
);
const top = props.top ?? (props.bottom ? "auto" : 0);
</script>
<style scoped lang="less">
.m-affix {
  position: sticky;
  display: inline-block;
}
</style>
