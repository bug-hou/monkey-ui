<template>
  <div
    class="m-cascader-item"
    :class="[
      option.disabled && 'm-cascader-item-disabled',
      'm-cascader-item-' + status
    ]"
  >
    <p class="m-cascader-rect" @click="clickHandle"></p>
    <p class="m-cascader-label">{{ option.label }}</p>
    <p v-if="verifyChildren()" class="m-cascader-children"></p>
  </div>
</template>

<script lang="ts" setup name="m-cascader-item">
/*
 * @Author: bughou
 * @Date: 2022-06-09 13:07:53
 * @Description: 创建一个m-cascader-item组件
 */
// 从下载的组件中导入函数
import { defineProps, withDefaults, defineEmits } from "vue";
import { Options } from "../config/type";
import { useInject } from "../../../hooks";
const props = withDefaults(
  defineProps<{
    option: Options;
    status: "select" | "has" | "none";
  }>(),
  {}
);

const emits = defineEmits(["select", "cancel"]);
function verifyChildren() {
  return props.option.children && props.option.children.length !== 0;
}
function clickHandle() {
  if (props.option.disabled) {
    return;
  }
  if (props.option.children && props.option.children.length !== 0) {
    if (props.status === "select") {
      emits("cancel");
    } else {
      emits("select");
    }
  }
}
const showRect = useInject(undefined, "showRect", true);
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
.m-cascader-item {
  display: flex;
  font-size: 16px;
  position: relative;
  align-items: center;
  margin-bottom: 5px;
  padding: 3px 10px;
  &.m-cascader-item-select {
    color: @color;
    .m-cascader-rect {
      background: @color;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 45%;
        transform: translate(-50%, -50%) rotate(-45deg);
        border-left: 2px solid white;
        border-bottom: 2px solid white;
        animation: leftToBottom 0.5s forwards;
      }
    }
  }
  &.m-cascader-item-has {
    color: @color;
    .m-cascader-rect {
      background: @color;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-bottom: 2px solid white;
        animation: toBottom 0.5s forwards;
      }
    }
  }
  .m-cascader-rect {
    position: relative;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    border: 1px solid @borderColor;
  }
  &.m-cascader-item-disabled {
    color: #6666;
    cursor: not-allowed;
  }
  .m-cascader-label {
    flex: 1;
    padding: 0 5px;
  }
  .m-cascader-children {
    width: 10px;
    height: 10px;
    border-left: 1px solid @borderColor;
    border-bottom: 1px solid @borderColor;
    transform: rotate(215deg);
  }
}
</style>
