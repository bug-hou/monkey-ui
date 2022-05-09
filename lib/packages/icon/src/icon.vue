<template>
  <span
    class="m-icon iconfont"
    :class="[name, 'icon-' + size]"
    :style="{
      ['--icon-color']: color
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
import { defineProps, withDefaults } from "vue";
import type { Size as IconSize } from "../../../type/index.type";
const props = withDefaults(
  defineProps<{
    name: string;
    size?: IconSize;
    color?: string;
  }>(),
  {
    size: "small"
  }
);
</script>
<style scoped lang="less">
.m-icon {
  display: inline-block;
  color: var(--icon-color);
  cursor: pointer;
  text-align: center;
}
.icon-mini {
  font-size: 12px;
}
.icon-small {
  font-size: 14px;
}
.icon-medium {
  font-size: 20px;
}
.icon-big {
  font-size: 28px;
}
</style>
