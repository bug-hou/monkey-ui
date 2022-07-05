<template>
  <div class="m-tree-item">
    <tree-child-vue
      :level="level + 1"
      v-if="option.children"
      :option="option"
      :path="path"
      @expand="expandHandle"
      @choose="chooseHandle"
      @transfer="transferHandle"
    ></tree-child-vue>
    <p
      v-else
      @click="clickHandle"
      :class="option.disabled && 'm-tree-child-disabled'"
    >
      <span
        class="m-tree-child-rect"
        :class="selectMap.get(option) && 'm-tree-child-select'"
      ></span>
      <span>{{ option[labelName] }}</span>
    </p>
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
  (e: "choose", level: number, option: any): void;
  (e: "transfer", level: number, option: any);
  (e: "expand", level: number, option: any[], signal: boolean): void;
}>();

const labelName = useInject(undefined, "labelName", "label");
const valueName = useInject(undefined, "valueName", "value");

const selectMap = useInject(
  undefined,
  "selectMap",
  new WeakMap<any, boolean>()
);

function expandHandle(level: number, option: any[], signal: boolean) {
  emits("expand", level, option, signal);
}

function clickHandle() {
  if (!props.option.disabled) {
    emits("choose", props.level, props.option);
  }
}

function chooseHandle(level: number, option: any) {
  emits("choose", level, option);
}

function transferHandle(level: number, option: any) {
  emits("transfer", level, option);
}
</script>
<style scoped lang="less">
@borderColor: #6666;
@color: (rgb(24, 160, 88));
@keyframes leftToBottom {
  0% {
    height: 0px;
    width: 0px;
  }
  30% {
    height: 3px;
    width: 0;
  }
  100% {
    width: 8px;
    height: 3px;
  }
}
@keyframes toBottom {
  0% {
    width: 0px;
  }
  100% {
    width: 8px;
  }
}
.m-tree-item {
  font-size: 16px;
  padding-left: 30px;
  margin: 5px 0;
  p {
    margin-left: -30px;
    padding-left: 30px;
    display: flex;
    &:hover {
      background-color: rgb(243, 243, 245);
      border-radius: 5px;
    }
    &.m-tree-child-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  .m-tree-child-rect {
    position: relative;
    width: 14px;
    height: 14px;
    border-radius: 3px;
    border: 1px solid @borderColor;
    align-self: center;
    margin-left: -5px;
    margin-right: 5px;
    &.m-tree-child-has {
      background: @color;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%) rotate(-45deg);
        border-left: 2px solid white;
        border-bottom: 2px solid white;
        animation: leftToBottom 0.5s forwards;
      }
    }
    &.m-tree-child-select {
      background: @color;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%) rotate(-45deg);
        border-left: 2px solid white;
        border-bottom: 2px solid white;
        animation: leftToBottom 0.5s forwards;
      }
    }
  }
}
</style>
