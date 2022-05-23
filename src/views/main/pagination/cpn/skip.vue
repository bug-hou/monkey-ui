<template>
  <cpn-play-vue
    title="skip"
    description="设置skip为true有一个数字选择框"
    :code="sizeCode"
  >
    <m-pagination
      :count="100"
      :defaultPageSize="10"
      v-model="page"
      useBack
      skip
    ></m-pagination>
    <br />
    <m-pagination
      :count="100"
      :defaultPageSize="10"
      useBack
      v-model="page"
      skip
      :nav="false"
    ></m-pagination>
    <br />
    <m-pagination
      :count="100"
      useBack
      :defaultPageSize="10"
      v-model="page"
    ></m-pagination>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="baseVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import { ref } from "vue";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { sizeCode } from "../doc";
const page = ref(1);
</script>
<style lang="less" scoped>
p {
  width: 20px;
  display: inline-block;
}
</style>
