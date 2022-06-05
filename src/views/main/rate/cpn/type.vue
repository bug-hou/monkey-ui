<template>
  <cpn-play-vue
    title="type"
    description="type怎么评分all(默认，只能为整数),half(可以选取一半),wantonly(任意取值)"
    :code="typeCode"
  >
    <m-rate v-model="miniValue" show type="all">
      <template #default="{ precent }"> 你当前评分为{{ precent }} </template>
    </m-rate>
    <m-rate v-model="smallValue" show suffix="分" type="half"></m-rate>
    <m-rate v-model="mediumValue" show type="wantonly"></m-rate>
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
import { typeCode } from "../doc";
import { ref } from "vue";
const miniValue = ref(4.2);
const smallValue = ref(3.7);
const mediumValue = ref(2.5);
</script>
