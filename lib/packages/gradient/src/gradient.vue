<template>
  <div class="m-gradient" :style="{ backgroundImage: gradient }">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="m-gradient">
/*
 * @Author: bughou
 * @Date: 2022-05-09 17:09:43
 * @Description: 创建一个m-gradient组件
 */
// 从下载的组件中导入函数
import { processStyle } from "../../../hooks/index";
import { defineProps, withDefaults } from "vue";
const props = withDefaults(
  defineProps<{
    deg?: string;
    colors?: string[];
  }>(),
  {
    colors: () => ["#ee9ca7", "#ffdde1"],
    deg: "90deg"
  }
);
const gradient = processStyle(
  "linear" + "-gradient(" + props.deg + ",",
  ")",
  ",",
  props.colors
);
</script>
<style scoped lang="less">
.m-gradient {
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  display: inline-block;
}
</style>
