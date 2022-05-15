<template>
  <cpn-play-vue
    title="disabled"
    description="disabled为true将某些选择框禁用,可以给group组件设置，或者单独设置"
    :code="sizeCode"
  >
    <m-check-box-group name="mini" v-model="checks1">
      <m-check-box value="m1">腾讯</m-check-box>
      <m-check-box value="m2" disabled>字节</m-check-box>
      <m-check-box value="m3">阿里</m-check-box>
      <m-check-box value="m4" disabled>百度</m-check-box>
    </m-check-box-group>
    <br />
    <m-check-box-group name="small" v-model="checks2">
      <m-check-box disabled value="draw">QQ炫舞</m-check-box>
      <m-check-box value="lol">英雄联盟</m-check-box>
      <m-check-box disabled value="cf">穿越火线</m-check-box>
      <m-check-box value="dnf">地下城勇士</m-check-box>
    </m-check-box-group>
    <br />
    <m-check-box-group name="medium" v-model="checks3">
      <m-check-box disabled value="dou">斗鱼</m-check-box>
      <m-check-box disabled value="mao">熊猫</m-check-box>
      <m-check-box disabled value="ya">虎牙</m-check-box>
      <m-check-box disabled value="zhan">B站</m-check-box>
    </m-check-box-group>
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
import { sizeCode } from "../doc";
import { ref } from "vue";
const checks1 = ref(["m1", "m4"]);
const checks2 = ref(["lol", "dnf"]);
const checks3 = ref(["ya", "zhan"]);
</script>
