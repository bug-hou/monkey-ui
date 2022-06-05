<template>
  <cpn-play-vue
    title="show"
    description="show为true时显示当前值"
    :code="showCode"
  >
    <m-rate v-model="miniValue" show>
      <template #default="{ precent }"> 你当前评分为{{ precent }} </template>
    </m-rate>
    <m-rate v-model="smallValue" show suffix="分"></m-rate>
    <m-rate v-model="mediumValue" show></m-rate>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="baseVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { showCode } from "../doc";
import { ref } from "vue";
const miniValue = ref(4.2);
const smallValue = ref(3.7);
const mediumValue = ref(2.5);
</script>
