<template>
  <div class="m-list-item" ref="listItemRef">
    <span
      v-if="type === 'number' || type === 'buller'"
      class="m-list-item-prefix"
    ></span>
    <slot></slot>
    <m-divider v-if="type === 'divider'" shape="solid"></m-divider>
  </div>
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
  onMounted
} from "vue";
import { useInject } from "../../../hooks";
const type = useInject<string>(undefined, "listType", "driver");

const count = ref(0);

const listItemRef = ref<HTMLDivElement>();

onMounted(() => {
  if (listItemRef.value && type === "number") {
    count.value = listItemRef.value.parentElement;
  }
});
</script>
<style scoped lang="less">
.m-list-item {
}
</style>
