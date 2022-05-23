<template>
  <cpn-play-vue
    title="useBack"
    description="设置useBack为true添加背景颜色"
    :code="sizeCode"
  >
    <m-pagination
      size="mini"
      :count="100"
      :defaultPageSize="6"
      v-model="page"
      useBack
    ></m-pagination>
    <br />
    <m-pagination
      size="small"
      :count="100"
      :defaultPageSize="6"
      useBack
      v-model="page"
    ></m-pagination>
    <br />
    <m-pagination
      size="medium"
      :count="100"
      useBack
      :defaultPageSize="6"
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
