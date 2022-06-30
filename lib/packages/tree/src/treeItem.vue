<template>
  <div class="m-tree-item">
    <tree-child-vue
      :level="level + 1"
      v-if="option.children"
      :option="option"
      :path="path"
      @expand="expandHandle"
    ></tree-child-vue>
    <p v-else @click="clickHandle">{{ option[labelName] }}</p>
  </div>
</template>

<script lang="ts" setup name="m-tree-item">
/*
 * @Author: bughou
 * @Date: 2022-06-29 13:36:38
 * @Description: 创建一个m-tree-item组件
 */
// 从下载的组件中导入函数
import { defineEmits, defineProps } from "vue";
import treeChildVue from "./treeChild.vue";
import { useInject } from "../../../hooks";
const props = withDefaults(
  defineProps<{
    option: any;
    level: number;
    path: WeakMap<any, boolean>;
  }>(),
  {}
);

const emits = defineEmits<{
  (e: "select", level: number, option: any): void;
  (e: "expand", level: number, option: any[], signal: boolean): void;
}>();

const labelName = useInject(undefined, "labelName", "label");
const valueName = useInject(undefined, "valueName", "value");

function expandHandle(level: number, option: any[], signal: boolean) {
  emits("expand", level, option, signal);
}

function clickHandle(){}
</script>
<style scoped lang="less">
.m-tree-item {
  font-size: 16px;
  padding-left: 30px;
  margin: 5px 0;
  p {
    margin-left: -30px;
    padding-left: 30px;
    &:hover {
      background-color: rgb(243, 243, 245);
      border-radius: 5px;
    }
  }
}
</style>
