<template>
  <div class="m-cascader">
    <div class="m-cascader-showValue">
      <p v-for="item in showValues">{{ item }}</p>
    </div>
    <div class="m-cascader-list">
      <cascader-list-vue
        v-for="(option, index) in showOptions"
        class="m-cascader-list-option"
        :index="index"
        :options="option"
        :select-index="selectIndex[index]"
        :active-index="activeIndex[index]"
        @change="changeHandle"
        @show="showHandle"
        @hidden="hiddenHandle"
      ></cascader-list-vue>
    </div>
  </div>
</template>

<script lang="ts" setup name="m-cascader">
/*
 * @Author: bughou
 * @Date: 2022-06-09 13:02:25
 * @Description: 创建一个m-cascader组件
 */
// 从下载的组件中导入函数
import { reactive, defineProps } from "vue";
import { Options } from "../config/type";

import cascaderListVue from "./cascaderList.vue";

const props = withDefaults(
  defineProps<{
    options: Options[];
  }>(),
  {}
);
const showOptions = reactive([props.options]);
const activeIndex = reactive([]);
const showValues = reactive([]);
const selectIndex = reactive([]);

function changeHandle(option: Options[], index: number, parentIndex: number) {
  showOptions.splice(index + 1, showOptions.length);
  activeIndex.splice(index, activeIndex.length);
  showOptions.push(option);
  activeIndex.push(parentIndex);
}
function showHandle(option: Options, index: number, parentIndex: number) {
  let showValue = "";
  for (let i = 0; i < index; i++) {
    showValue += showOptions[i][activeIndex[i]].label + "/";
  }
  showValue += option.label;
  showValues.push(showValue);

  if (!Array.isArray(selectIndex[index])) {
    selectIndex[index] = [];
  }
  selectIndex[index].push(parentIndex);
}
function hiddenHandle(option: Options, index: number, parentIndex: number) {
  selectIndex[index].splice(selectIndex[index].indexOf(parentIndex), 1);
  if (selectIndex[index].length === 0) {
    selectIndex[index] = null;
  }

  let showValue = "";
  for (let i = 0; i < index; i++) {
    showValue += showOptions[i][activeIndex[i]].label + "/";
  }
  showValue += option.label;

  showValues.splice(showValues.indexOf(showValue), 1);
}
</script>
<style scoped lang="less">
@color: (rgb(239, 239, 245));
.m-cascader {
  position: relative;
  .m-cascader-showValue {
    min-height: 38px;
    display: flex;
    border: 1px solid @color;
    padding: 5px 10px;
    border-radius: 10px;
    p {
      padding: 0px 10px;
      margin-right: 10px;
      background-color: @color;
      border: 1px solid #6666;
    }
    &:hover {
      border-color: #0ff;
    }
  }
  .m-cascader-list {
    position: absolute;
    top: 110%;
    left: 0;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    background-color: #fafbfc;
    display: inline-flex;
    .m-cascader-list-option {
      border-right: 1px solid @color;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
