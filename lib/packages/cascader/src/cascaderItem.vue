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
  if (props.option.children && props.option.children.length !== 0) {
    if (props.status === "select") {
      emits("cancel");
    } else {
      emits("select");
    }
  }
}
</script>
<style scoped lang="less">
@borderColor: #6666;
@color: (rgb(24, 160, 88));
.m-cascader-item {
  display: flex;
  font-size: 16px;
  position: relative;
  align-items: center;
  margin-bottom: 5px;
  padding: 0 10px;
  &.m-cascader-item-select {
    color: @color;
    .m-cascader-rect {
      background: @color;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%) rotate(-45deg);
        height: 4px;
        width: 10px;
        border-left: 2px solid white;
        border-bottom: 2px solid white;
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
        top: 40%;
        transform: translate(-50%, -50%);
        height: 4px;
        width: 10px;
        border-bottom: 2px solid white;
      }
    }
  }
  .m-cascader-rect {
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 3px;
    border: 1px solid @borderColor;
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
