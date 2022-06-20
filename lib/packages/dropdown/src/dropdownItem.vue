<template>
  <m-dropdown-vue :options="options" direction="left">
    <div class="m-dropdown-item">
      <p class="m-dropdown-item-label">{{ content }}</p>
      <p class="m-dropdown-item-arrow"></p>
    </div>
  </m-dropdown-vue>
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
import mDropdownVue from "./dropdown.vue";
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
  display: flex;
  align-items: center;
  position: relative;
  .m-dropdown-item-arrow {
    border: 5px solid transparent;
    border-left-color: #6666;
    position: absolute;
    right: -5px;
  }
  .m-dropdown-item-label {
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: #6666;
    }
  }
}
</style>
