<template>
  <cpn-play-vue
    title="disabled"
    description="disabled为true时该标签禁止点击"
    :code="disabledCode"
  >
    <template v-for="(item, index) in list" :key="index">
      <m-tag :type="item.type" :disabled="!isDisabled">{{ item.name }}</m-tag>
      <span></span>
    </template>
    <m-switch v-model="isDisabled" style="vertical-align: top"></m-switch>
  </cpn-play-vue>
</template>

<script lang="ts" setup>
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import { reactive, ref } from "vue";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { disabledCode } from "../doc";
const isDisabled = ref(true);
const list = reactive([
  { name: "昨天已成过去", type: "error" },
  { name: "明天还未到来", type: "info" },
  { name: "今天你能改变", type: "primary" },
  { name: "每天都要加油", type: "success" }
]);
</script>
<style lang="less" scoped>
span {
  width: 20px;
  display: inline-block;
}
</style>
