<template>
  <cpn-play-vue
    title="type"
    description="触发阴影的效果不同none(默认)一直都没有，always一直显示，hover移入显示，click点击显示"
    :code="typeCode"
  >
    <m-card class="card">
      <template #header> 卡片 </template>
      默认卡片
    </m-card>
    <m-card type="always" class="card">
      <template #header> 卡片 </template>
      always卡片</m-card
    >
    <m-card type="hover" class="card">
      <template #header> 卡片 </template>
      hover卡片</m-card
    >
    <m-card type="click" class="card">
      <template #header> 卡片 </template>
      click卡片</m-card
    >
  </cpn-play-vue>
</template>

<script lang="ts" setup name="size">
/*
 * @Author: bughou
 * @Date: 2022-05-09 16:07:00
 * @Description: 创建一个size组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { typeCode } from "../doc";
</script>
<style scoped lang="less">
.card {
  display: inline-block;
  width: 240px;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
