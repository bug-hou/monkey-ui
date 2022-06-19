<template>
  <div class="m-dropdown-item"></div>
  <m-tooltip-vue :tooltipText="options" :columns="1">
    <p>{{ content }}</p>
    <template #tooltip="{value}">

    </template>
  </m-tooltip-vue>
</template>

<script lang="ts" setup name="m-dropdown-item">
/*
 * @Author: bughou
 * @Date: 2022-06-19 14:33:29
 * @Description: 创建一个m-dropdown-item组件
 */
// 从下载的组件中导入函数
import { ref, reactive, defineEmits, defineExpose, defineProps } from "vue";
import mTooltipVue from "../../tooltip/src/tooltip.vue";
withDefaults(
  defineProps<{
    content: string;
    options: any[];
  }>(),
  {}
);
</script>
<style scoped lang="less">
.m-dropdown-item {
}
</style>

