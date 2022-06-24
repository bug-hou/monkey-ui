<template>
  <div
    class="m-dropdown-child"
    @click="clickHandle"
  >
    <p>{{ options[labelName] }}</p>
    <p class="m-dropdown-child-arrow"></p>
    <m-dropdown-item
      v-show="showChild"
      class="m-dropdown-child-item"
      :options="options.children"
    ></m-dropdown-item>
  </div>
</template>

<script lang="ts" setup name="m-dropdown-child">
/*
 * @Author: bughou
 * @Date: 2022-06-20 21:07:22
 * @Description: 创建一个m-dropdown-child组件
 */
// 从下载的组件中导入函数
import { ref, defineProps } from "vue";
import mDropdownItem from "./dropdownItem.vue";
const props = withDefaults(
  defineProps<{
    options: any;
    labelName?: string;
  }>(),
  {
    labelName: "label"
  }
);
const showChild = ref(false);

function clickHandle() {
  showChild.value = true;
}
</script>
<style scoped lang="less">
.m-dropdown-child {
  display: flex;
  position: relative;
  .m-dropdown-child-arrow {
    border: 2px solid transparent;
    border-top-color: #6666;
    border-right-color: #6666;
    width: 7px;
    height: 7px;
    margin-left: 7px;
    transform: rotate(45deg) translateY(-50%);
    position: relative;
    top: 12px;
  }
  .m-dropdown-child-item {
    top: -7px;
    left: 100%;
  }
}
</style>
