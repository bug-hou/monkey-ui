<template>
  <cpn-play-vue
    title="showSizePicker"
    description="showSizePicker"
    :code="sizeCode"
  >
    <m-pagination
      size="mini"
      :count="10"
      :defaultPageSize="5"
      v-model="page"
      v-model:pageSize="pageSize"
      showSizePicker
      :pageSizes="pageSizes"
    ></m-pagination>
    <br />
    <m-pagination
      size="small"
      :count="5"
      :defaultPageSize="5"
      useBack
      v-model="page"
      v-model:pageSize="pageSize"
      showSizePicker
      :pageSizes="pageSizes"
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
const pageSize = ref(10);
const pageSizes = [
  {
    label: "10 每页",
    value: 10
  },
  {
    label: "20 每页",
    value: 20
  },
  {
    label: "30 每页",
    value: 30
  },
  {
    label: "40 每页",
    value: 50
  }
];
</script>
<style lang="less" scoped>
p {
  width: 20px;
  display: inline-block;
}
</style>
