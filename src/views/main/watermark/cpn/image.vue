<template>
  <cpn-play-vue
    title="rotate"
    description="rotate设置水印旋转度数"
    :code="rotateCode"
  >
    <m-watermark content="bughou" :visible="switchValue" :rotate="160">
      <div
        style="display: flex; font-size: 12px; gap: 10px; align-items: center"
      >
        <p>是否显示水印</p>
        <m-switch v-model="switchValue"></m-switch>
      </div>
      <br />
      <m-list type="stripe">
        <m-list-item>我是列表1号，我其实是筹字数的</m-list-item>
        <m-list-item>我是列表2号，我其实是筹字数的</m-list-item>
        <m-list-item>我是列表3号，我其实是筹字数的</m-list-item>
        <m-list-item>我是列表4号，我其实是筹字数的</m-list-item>
        <m-list-item>我是列表1号，我其实是筹字数的</m-list-item>
        <m-list-item>我是列表1号，我其实是筹字数的</m-list-item>
        <m-list-item>我是列表1号，我其实是筹字数的</m-list-item>
        <m-list-item>我是列表1号，我其实是筹字数的</m-list-item>
        <m-list-item>我是列表1号，我其实是筹字数的</m-list-item>
        <m-list-item>我是列表1号，我其实是筹字数的</m-list-item>
      </m-list>
    </m-watermark>
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
import { rotateCode } from "../doc";
const switchValue = ref(true);
</script>
