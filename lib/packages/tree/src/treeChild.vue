<template>
  <div class="m-tree-child">
    <div class="m-tree-child-content" @click.stop="clickHandle">
      <span
        class="m-tree-child-signal"
        :class="showChild && 'm-tree-child-active'"
      ></span>
      <p class="m-tree-child-label">{{ option[labelName] }}</p>
    </div>
    <ul class="m-tree-child-list" :class="showChild && 'm-tree-child-show'">
      <li v-for="item in option.children">
        <tree-item-vue :option="item"></tree-item-vue>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup name="m-tree-child">
/*
 * @Author: bughou
 * @Date: 2022-06-29 13:24:35
 * @Description: 创建一个m-tree-child组件
 */
// 从下载的组件中导入函数
import { defineProps, ref, unref } from "vue";
import { useInject } from "../../../hooks";
import treeItemVue from "./treeItem.vue";
const props = withDefaults(
  defineProps<{
    option: any;
  }>(),
  {}
);

const emits = defineEmits(["expand"]);
const labelName = useInject(undefined, "labelName", "label");
const valueName = useInject(undefined, "valueName", "value");

const showChild = ref(false);

function clickHandle() {
  showChild.value = !unref(showChild);
  emits("expand");
}
</script>
<style scoped lang="less">
.m-tree-child {
  position: relative;
  padding-left: 30px;
  .m-tree-child-signal {
    position: absolute;
    top: 7px;
    left: 10px;
    border: 5px solid transparent;
    border-left-color: #666;
    transition: transform 0.3s;
  }
  .m-tree-child-active {
    transform: rotate(90deg);
  }
  .m-tree-child-content {
    margin-left: -30px;
    padding-left: 30px;
    &:hover {
      background-color: #e7f5ee;
      border-radius: 5px;
    }
  }
  .m-tree-child-label {
    font-size: 18px;
  }
  .m-tree-child-list {
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s;
    &.m-tree-child-show {
      max-height: 400px;
    }
  }
}
</style>
