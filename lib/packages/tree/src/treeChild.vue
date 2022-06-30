<template>
  <div class="m-tree-child">
    <div
      class="m-tree-child-content"
      :class="path.get(option.children) && 'm-tree-child-content-hover'"
      @click.stop="clickHandle"
    >
      <span
        class="m-tree-child-signal"
        :class="path.get(option.children) && 'm-tree-child-active'"
      ></span>
      <p class="m-tree-child-label">{{ option[labelName] }}</p>
    </div>
    <ul
      class="m-tree-child-list"
      :class="path.get(option.children) && 'm-tree-child-show'"
    >
      <li v-for="item in option.children">
        <tree-item-vue
          :path="path"
          :option="item"
          :level="level + 1"
          @expand="expandHandle"
        ></tree-item-vue>
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
import { defineProps, ref, unref, watch } from "vue";
import { useInject } from "../../../hooks";
import treeItemVue from "./treeItem.vue";
const props = withDefaults(
  defineProps<{
    option: any;
    level: number;
    path: WeakMap<any, boolean>;
  }>(),
  {}
);

const emits = defineEmits<{
  (e: "expand", level: number, options: any[], signal: boolean): void;
}>();

const labelName = useInject(undefined, "labelName", "label");
const valueName = useInject(undefined, "valueName", "value");

function clickHandle() {
  emits(
    "expand",
    props.level,
    props.option.children,
    !(props.path.get(props.option.children) ?? false)
  );
}

function expandHandle(level: number, option: any[], signal: boolean) {
  emits("expand", level, option, signal);
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
    &:hover,
    &.m-tree-child-content-hover {
      background-color: #e7f5ee;
      border-radius: 5px;
    }
  }
  .m-tree-child-label {
    font-size: 18px;
  }
  .m-tree-child-list {
    height: 0;
    overflow: hidden;
    &.m-tree-child-show {
      height: auto;
    }
  }
}
</style>
