<template>
  <div class="m-list"></div>
</template>

<script lang="ts" setup name="m-list">
/*
 * @Author: bughou
 * @Date: 2022-07-26 19:36:57
 * @Description: 创建一个m-list组件
 */
// 从下载的组件中导入函数
import { ref, reactive, defineEmits, defineExpose, defineProps } from "vue";
type ListType = "public" | "bullet" | "number" | "option";
const props = withDefaults(
  defineProps<{
    type: ListType;
  }>(),
  {}
);
</script>
<style scoped lang="less">
.m-list {
}
</style>
