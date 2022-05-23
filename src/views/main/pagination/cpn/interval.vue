<template>
  <cpn-play-vue
    title="interval"
    description="通过interval设置间隙大小"
    :code="sizeCode"
  >
    <m-pagination
      size="mini"
      :count="10"
      :defaultPageSize="6"
      v-model="page"
      interval="10px"
    ></m-pagination>
    <br />
    <m-pagination
      size="small"
      :count="5"
      :defaultPageSize="5"
      useBack
      interval="20px"
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
