<template>
  <li
    class="m-list-item"
    :class="[
      type === 'stripe' && 'm-list-item-stripe',
      type === 'divider' && 'm-list-item-divider'
    ]"
  >
    <p class="m-list-item-p">
      <slot></slot>
    </p>
    <m-divider
      v-if="type === 'divider'"
      class="m-list-item-divider-cpn"
      shape="solid"
    ></m-divider>
  </li>
</template>

<script lang="ts" setup name="m-list-item">
/*
 * @Author: bughou
 * @Date: 2022-07-26 19:37:06
 * @Description: 创建一个m-list-item组件
 */
// 从下载的组件中导入函数
import mDivider from "../../divider/src/divider.vue";
import {
  ref,
  reactive,
  defineEmits,
  defineExpose,
  defineProps,
  getCurrentInstance,
  onMounted
} from "vue";
import { useInject } from "../../../hooks";
const type = useInject<string>(undefined, "listType", "driver");

const listItemRef = ref<HTMLDivElement>();
</script>
<style scoped lang="less">
.m-list-item {
  list-style: inherit;
  &.m-list-item-stripe {
    padding-left: 10px;
    &:nth-child(2n + 1) {
      background-color: #f3f4f7;
      border-top: 1px solid #e7eaef;
      border-bottom: 1px solid #e7eaef;
    }
  }
  &.m-list-item-divider {
    font-size: 0;
    &:last-of-type {
      .m-list-item-divider-cpn {
        display: none;
      }
    }
  }
  .m-list-item-p {
    font-size: 16px;
    padding: 8px 0;
  }
}
</style>
