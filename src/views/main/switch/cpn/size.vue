<template>
  <cpn-play-vue
    title="size"
    description="只有大小不一样，size支持mini，small，medium"
    code="sizeCode"
  >
    <m-switch v-model="switchValue" size="mini"></m-switch>
    <p></p>
    <m-switch v-model="switchValue" size="small"></m-switch>
    <p></p>
    <m-switch v-model="switchValue" size="medium"></m-switch>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="baseVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import { ref, watch } from "vue";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
// import { sizeCode } from "../doc";
const switchValue = ref(true);
</script>
<style lang="less" scoped>
p {
  width: 20px;
  display: inline-block;
}
</style>
