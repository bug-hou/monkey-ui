<template>
  <i
    class="m-icon iconfont"
    :class="name"
    :style="{
      ['--icon-color']: color
    }"
  ></i>
</template>

<script lang="ts" setup name="mIcon">
/*
 * @Author: bughou
 * @Date: 2022-05-01 20:19:22
 * @Description: 创建一个icon组件
 */
// 从下载的组件中导入函数
import { defineProps, withDefaults } from "vue";
const props = withDefaults(
  defineProps<{
    name: string;
    color?: string;
  }>(),
  {
    color: "inherit"
  }
);
</script>
<style scoped lang="less">
.m-icon {
  display: inline-block;
  color: var(--icon-color);
  text-align: center;
  font-size: inherit;
  line-height: 1;
}
</style>
