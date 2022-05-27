<template>
  <cpn-play-vue
    title="rounded"
    description="rounded为true时圆形标签"
    :code="roundedCode"
  >
    <template v-for="(item, index) in list" :key="index">
      <m-tag rounded>{{ item }}</m-tag>
      <span></span>
    </template>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="baseVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import { reactive } from "vue";
import { roundedCode } from "../doc";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
const list = reactive(["大雨如期而至", "悲观如梦而袭"]);
</script>
<style lang="less" scoped>
span {
  width: 20px;
  display: inline-block;
}
</style>
