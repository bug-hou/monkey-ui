<template>
  <cpn-play-vue
    title="count"
    description="count设置显示多少个星星"
    :code="countCode"
  >
    <m-rate v-model="smallValue" :count="7"></m-rate>
    <m-rate v-model="mediumValue" :count="3"></m-rate>
  </cpn-play-vue>
</template>

<script lang="ts" setup>
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { countCode } from "../doc";
import { ref } from "vue";
const smallValue = ref(3.7);
const mediumValue = ref(2.5);
</script>
