<template>
  <div class="mIconGroup">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="mIconGroup">
/*
 * @Author: bughou
 * @Date: 2022-05-02 18:17:33
 * @Description: 创建一个mIconGroup组件
 */
// 从下载的组件中导入函数
import { defineProps, withDefaults, provide } from "vue";
import type {
  Size as IconSize,
  Type as IconType
} from "../../../type/index.type";
const props = withDefaults(
  defineProps<{
    size?: IconSize;
    color?: string;
    plain?: boolean;
    type?: IconType;
  }>(),
  {
    size: "small",
    plain: true,
    type: "default"
  }
);
provide("size", props.size);
provide("plain", props.plain);
provide("type", props.type);
</script>
<style scoped lang="less"></style>
