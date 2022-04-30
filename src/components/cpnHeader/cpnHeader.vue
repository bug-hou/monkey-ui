<template>
  <div class="cpnHeader">
    <h3>{{ initialCapital(title) + " " + name }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script lang="ts" setup name="cpnHeader">
/*
 * @Author: bughou
 * @Date: 2022-04-30 14:42:23
 * @Description: 创建一个cpnHeader组件
 */
// 从下载的组件中导入函数
import { defineProps, withDefaults } from "vue";
import { initialCapital } from "../../utils";
const props = withDefaults(
  defineProps<{
    title: string;
    description: string;
    name: string;
  }>(),
  {}
);
</script>
<style scoped lang="less">
.cpnHeader {
  h3 {
    font-size: 1.8rem;
  }
  p {
    font-size: 0.8rem;
    color: #a1a2a3;
  }
}
</style>
