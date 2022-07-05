<template>
  <div class="m-tree-child">
    <div
      class="m-tree-child-content"
      :class="[
        path.get(option) && 'm-tree-child-content-hover',
        option.disabled && 'm-tree-child-disabled'
      ]"
      @click="clickHandle"
    >
      <span
        class="m-tree-child-rect"
        :class="[
          hasMap.get(option) && 'm-tree-child-has',
          selectMap.get(option) && 'm-tree-child-select'
        ]"
        @click.stop="chooseHandle()"
      ></span>
      <span
        class="m-tree-child-signal"
        :class="path.get(option) && 'm-tree-child-active'"
      ></span>
      <p class="m-tree-child-label">{{ option[labelName] }}</p>
    </div>
    <ul
      class="m-tree-child-list"
      :class="path.get(option) && 'm-tree-child-show'"
    >
      <li v-for="item in option.children">
        <tree-item-vue
          :path="path"
          :option="item"
          :level="level + 1"
          @expand="expandHandle"
          @choose="chooseHandle"
          @transfer="transferHandle"
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
import { defineProps } from "vue";
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
  (e: "choose", level: number, option: any);
  (e: "transfer", level: number, option: any);
}>();

const labelName = useInject(undefined, "labelName", "label");
const valueName = useInject(undefined, "valueName", "value");
const hasMap = useInject(undefined, "hasMap", new WeakMap<any, boolean>());

const selectMap = useInject(
  undefined,
  "selectMap",
  new WeakMap<any, boolean>()
);

function clickHandle() {
  if (!props.option.disabled) {
    emits(
      "expand",
      props.level,
      props.option,
      !(props.path.get(props.option) ?? false)
    );
  }
}

function expandHandle(level: number, option: any[], signal: boolean) {
  emits("expand", level, option, signal);
}

function chooseHandle(level: number = props.level, option: any = props.option) {
  if (!props.option.disabled) {
    emits("choose", level, option);
  }
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
        transform: translate(-50%, -50%);
        border-bottom: 2px solid white;
        animation: toBottom 0.5s forwards;
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
  .m-tree-child-active {
    transform: rotate(90deg);
  }
  .m-tree-child-content {
    margin-left: -30px;
    padding-left: 30px;
    display: flex;
    &:hover,
    &.m-tree-child-content-hover {
      background-color: #e7f5ee;
      border-radius: 5px;
    }
  }
  .m-tree-child-has {
    color: pink;
  }
  .m-tree-child-select {
    color: #0ff;
  }
  .m-tree-child-label {
    font-size: 18px;
  }
  .m-tree-child-disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
