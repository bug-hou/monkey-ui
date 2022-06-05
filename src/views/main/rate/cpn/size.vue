<template>
  <cpn-play-vue
    title="size"
    description="只有大小不一样，size支持mini，small，medium,点击可以改变值，使用v-model连接"
    :code="sizeCode"
  >
    <m-rate v-model="miniValue" size="mini"></m-rate>
    <m-rate v-model="smallValue" size="small"></m-rate>
    <m-rate v-model="mediumValue" size="medium"></m-rate>
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
import { sizeCode } from "../doc";
import { ref } from "vue";
const miniValue = ref(4);
const smallValue = ref(3);
const mediumValue = ref(2);
</script>
