<template>
  <cpn-play-vue
    title="readonly"
    description="当readonly为true就只能读了"
    :code="readonlyCode"
  >
    <m-rate v-model="miniValue" readonly></m-rate>
    <m-rate v-model="smallValue" readonly></m-rate>
    <m-rate v-model="mediumValue" readonly></m-rate>
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
import { readonlyCode } from "../doc";
import { ref } from "vue";
const miniValue = ref(4.2);
const smallValue = ref(3.7);
const mediumValue = ref(2.5);
</script>
