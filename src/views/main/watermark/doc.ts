export const baseCode = `<template>
  <m-watermark content="bughou" :visible="switchValue">
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
</template>

<script lang="ts" setup name="baseVue">
import { ref } from "vue";
const switchValue = ref(true);
</script>
`;

export const rotateCode = `<template>
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
</template>

<script lang="ts" setup name="baseVue">
import { ref } from "vue";
const switchValue = ref(true);
</script>
`;
