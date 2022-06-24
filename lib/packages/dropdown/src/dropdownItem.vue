<template>
  <ul class="m-dropdown-item">
    <li v-for="(item, index) in options" class="m-dropdown-item-li">
      <m-dropdown-child v-if="item.children" :options="item"></m-dropdown-child>
      <p v-else>{{ item[labelName] }}</p>
    </li>
  </ul>
</template>

<script lang="ts" setup name="m-dropdown-item">
/*
 * @Author: bughou
 * @Date: 2022-06-20 21:05:18
 * @Description: 创建一个m-dropdown-item组件
 */
// 从下载的组件中导入函数
import { ref, reactive, defineEmits, defineExpose, defineProps } from "vue";
import mDropdownChild from "./dropdownChild.vue";
const props = withDefaults(
  defineProps<{
    options: any[];
    labelName?: string;
  }>(),
  {
    labelName: "label"
  }
);
</script>
<style scoped lang="less">
.m-dropdown-item {
  position: absolute;
  margin: 0px 20px;
  padding: 5px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  &.m-dropdown-right {
    left: 100%;
  }
  &.m-dropdown-left {
    right: 100%;
  }
  &.m-dropdown-top {
    bottom: 100%;
  }
  .m-dropdown-item-li {
    padding: 5px 10px;
    cursor: pointer;
    white-space: nowrap;
    border-radius: 8px;
    &:hover {
      background-color: rgb(243, 243, 245);
    }
  }
}
</style>
