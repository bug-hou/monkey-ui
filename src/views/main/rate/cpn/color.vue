<template>
  <cpn-play-vue
    title="color"
    description="设置color自定义颜色"
    :code="colorCode"
  >
    <m-rate v-model="smallValue" color="#FF416C"></m-rate>
    <m-rate v-model="mediumValue" color="#06beb6"></m-rate>
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
import { colorCode } from "../doc";
import { ref } from "vue";
const smallValue = ref(3.7);
const mediumValue = ref(2.5);
</script>

