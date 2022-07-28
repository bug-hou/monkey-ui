<template>
  <cpn-play-vue
    title="嵌套"
    description="通过设置title插槽或者使用m-list组件"
    :code="mixCode"
  >
    <div class="list-div">
      <m-list type="decimal">
        <m-list-item>腾讯</m-list-item>
        <m-list type="square">
          <m-list-item>腾讯云</m-list-item>
          <m-list-item>王者荣耀</m-list-item>
          <m-list-item>英雄联盟手游</m-list-item>
        </m-list>
        <m-list-item>阿里</m-list-item>
        <m-list type="square">
          <m-list-item>支付宝</m-list-item>
          <m-list-item>天猫</m-list-item>
          <m-list-item>淘宝</m-list-item>
        </m-list>
        <m-list-item>字节</m-list-item>
        <m-list type="square">
          <m-list-item>抖音</m-list-item>
          <m-list-item>皮皮虾</m-list-item>
          <m-list-item>西瓜视频</m-list-item>
        </m-list>
      </m-list>
      <m-list type="decimal">
        <m-list type="circle">
          <template #title> 腾讯 </template>
          <m-list-item>腾讯云</m-list-item>
          <m-list-item>王者荣耀</m-list-item>
          <m-list-item>英雄联盟手游</m-list-item>
        </m-list>
        <m-list type="circle">
          <template #title> 阿里 </template>
          <m-list-item>支付宝</m-list-item>
          <m-list-item>天猫</m-list-item>
          <m-list-item>淘宝</m-list-item>
        </m-list>
        <m-list type="circle">
          <template #title> 字节 </template>
          <m-list-item>抖音</m-list-item>
          <m-list-item>皮皮虾</m-list-item>
          <m-list-item>西瓜视频</m-list-item>
        </m-list>
      </m-list>
    </div>
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
import { mixCode } from "../doc";
</script>
<style lang="less">
.list-div {
  display: flex;
  gap: 10px;
  > * {
    flex: 1;
  }
}
</style>
