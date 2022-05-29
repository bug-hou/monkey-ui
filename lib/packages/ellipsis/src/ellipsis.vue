<template>
  <div
    class="m-ellipsis-box"
    :style="[{ ['--m-ellipsis-clamp']: clamp }, { width: width }]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="m-ellipsis">
/*
 * @Author: bughou
 * @Date: 2022-05-29 14:20:23
 * @Description: 创建一个m-ellipsis组件
 */
// 从下载的组件中导入函数
import { defineProps } from "vue";
withDefaults(
  defineProps<{
    width?: string;
    clamp?: number;
  }>(),
  {
    clamp: 1
  }
);
</script>
<style scoped lang="less">
.m-ellipsis-box {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: var(--m-ellipsis-clamp);
  display: -webkit-inline-box;
  -webkit-box-orient: vertical;
  cursor: pointer;
  position: relative;
}
</style>
