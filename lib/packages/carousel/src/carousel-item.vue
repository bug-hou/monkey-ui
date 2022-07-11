<template>
  <div class="carouselItem">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="carouselItem">
/*
 * @Author: bughou
 * @Date: 2022-07-11 16:00:12
 * @Description: 创建一个carouselItem组件
 */
// 从下载的组件中导入函数
import { ref, reactive, defineEmits, defineExpose, defineProps } from "vue";
</script>
<style scoped lang="less">
.carouselItem {
}
</style>
