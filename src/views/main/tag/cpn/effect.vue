<template>
  <cpn-play-vue
    title="effect"
    description="effect可选择值为plain，light(默认)，dark"
    :code="effectCode"
  >
    <template v-for="(item, index) in list" :key="index">
      <m-tag :effect="item.effect" closabled>{{ item.name }}</m-tag>
      <span></span>
    </template>
  </cpn-play-vue>
</template>

<script lang="ts" setup>
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import { reactive } from "vue";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { effectCode } from "../doc";
const list = reactive([
  { name: "Tag dart", effect: "dart" },
  { name: "Tag light", effect: "light" },
  { name: "Tag plain", effect: "plain" }
]);
</script>
<style lang="less" scoped>
span {
  width: 20px;
  display: inline-block;
}
</style>
