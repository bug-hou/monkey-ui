<template>
  <div class="m-list">
    <p style="color: rgba(0, 0, 0, 0.4)">
      <slot name="title"></slot>
    </p>

    <ul
      class="m-list-ul"
      :style="[
        !(type === 'divider' || type === 'public' || type === 'stripe') && {
          listStyle: type
        }
      ]"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts" setup name="m-list">
/*
 * @Author: bughou
 * @Date: 2022-07-26 19:36:57
 * @Description: 创建一个m-list组件
 */
// 从下载的组件中导入函数
import { defineProps, provide } from "vue";
type ListType =
  | "decimal"
  | "option"
  | "circle"
  | "square"
  | "divider"
  | "stripe"
  | "public";
const props = withDefaults(
  defineProps<{
    type?: ListType;
  }>(),
  {
    type: "public"
  }
);
provide<ListType>("listType", props.type);
</script>
<style scoped lang="less">
.m-list {
  font-size: 16px;
  .m-list-ul {
    padding-left: 20px;
    list-style: none;
    font-size: 13px;
  }
}
</style>
