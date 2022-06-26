<template>
  <ul class="m-dropdown-item">
    <li v-for="(item, index) in options" class="m-dropdown-item-li">
      <m-dropdown-child
        v-if="item.children"
        :options="item"
        @hidden="clickHandle"
      ></m-dropdown-child>
      <div v-else @click="clickHandle(item)">
        <p>
          {{ item[labelName] }}
        </p>
      </div>
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
import { defineProps } from "vue";
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
const emits = defineEmits(["hidden"]);
function clickHandle(option: any) {
  emits("hidden", option);
}
</script>
<style scoped lang="less">
.m-dropdown-item {
  position: absolute;
  border-radius: 8px;
  background-color: white;
  padding: 2px 0;
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
    cursor: pointer;
    div {
      height: 100%;
      padding-left: 0;
      white-space: nowrap;
      display: flex;
      p {
        height: 100%;
        padding: 5px 15px;
        border-radius: 5px;
        &:hover {
          background-color: rgb(243, 243, 245);
        }
      }
      &::before,
      &::after {
        content: "";
        display: inline-block;
        width: 2px;
      }
    }
  }
}
</style>
