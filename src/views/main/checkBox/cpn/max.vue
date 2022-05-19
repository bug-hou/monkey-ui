<template>
  <cpn-play-vue
    title="max"
    description="max设置最多可以选择的个数，默认为无穷"
    :code="maxCode"
    class="max"
  >
    <m-check-box-group name="mini" v-model="checks1" button :max="3">
      <m-check-box value="腾讯">腾讯</m-check-box>
      <m-check-box value="字节">字节</m-check-box>
      <m-check-box value="阿里">阿里</m-check-box>
      <m-check-box value="百度">百度</m-check-box>
      <m-check-box value="米哈游">米哈游</m-check-box>
    </m-check-box-group>
    <m-card type="hover" class="card">最多只能添加3个</m-card>
    <m-card type="hover" class="card">当前选择:{{ checks1.join("-") }}</m-card>
    <m-check-box-group name="mini" v-model="checks2" button>
      <m-check-box value="王者荣耀">王者荣耀</m-check-box>
      <m-check-box value="英雄联盟">英雄联盟</m-check-box>
      <m-check-box value="和平精英">和平精英</m-check-box>
      <m-check-box value="元神">元神</m-check-box>
      <m-check-box value="CSGO">CSGO</m-check-box>
    </m-check-box-group>
    <m-card type="hover" class="card">可以添加无穷多个</m-card>
    <m-card type="hover" class="card">当前选择:{{ checks2.join("-") }}</m-card>
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
import { maxCode } from "../doc";
import { ref } from "vue";
const checks1 = ref([]);
const checks2 = ref([]);
</script>
<style scoped lang="less">
.max {
  .card:nth-child(2),
  .card:nth-child(5) {
    width: 200px;
  }
}
.card {
  margin: 10px 0;
}
</style>
