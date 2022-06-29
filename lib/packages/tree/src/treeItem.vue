<template>
  <div class="m-tree-item">
    <tree-child-vue v-if="option.children" :option="option"></tree-child-vue>
    <p v-else>{{ option[labelName] }}</p>
  </div>
</template>

<script lang="ts" setup name="m-tree-item">
/*
 * @Author: bughou
 * @Date: 2022-06-29 13:36:38
 * @Description: 创建一个m-tree-item组件
 */
// 从下载的组件中导入函数
import { ref, reactive, defineEmits, defineExpose, defineProps } from "vue";
import treeChildVue from "./treeChild.vue";
import { useInject } from "../../../hooks";
const props = withDefaults(
  defineProps<{
    option: any;
  }>(),
  {}
);

const labelName = useInject(undefined, "labelName", "label");
const valueName = useInject(undefined, "valueName", "value");
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
