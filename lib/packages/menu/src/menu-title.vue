<template>
  <div class="m-menu-title">
    <m-icon v-if="icon" :name="icon"></m-icon>
    <span>{{ title }}</span>
  </div>
</template>

<script lang="ts" setup name="m-menu-title">
/*
 * @Author: bughou
 * @Date: 2022-07-18 20:43:23
 * @Description: 创建一个m-menu-title组件
 */
// 从下载的组件中导入函数
import { ref, reactive, defineEmits, defineExpose, defineProps } from "vue";
import mIcon from "../../icon/src/icon.vue";
const props = withDefaults(
  defineProps<{
    title?: string;
    icon?: string;
  }>(),
  {}
);
</script>
<style scoped lang="less">
.m-menu-title {
  width: 200px;
  height: 40px;
  transition: width 0.5s;
  display: flex;
  gap: 10px;
}
</style>
