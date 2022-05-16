<template>
  <cpn-play-vue
    title="disabled"
    description="disabled为true将某些选择框禁用,可以给group组件设置，或者单独设置"
    :code="disabledCode"
  >
    <m-radio-group name="disabled1" v-model="checks1">
      <m-radio value="m1">腾讯</m-radio>
      <m-radio value="m2" disabled>字节</m-radio>
      <m-radio value="m3">阿里</m-radio>
      <m-radio value="m4" disabled>百度</m-radio>
    </m-radio-group>
    <br />
    <m-radio-group name="disabled2" v-model="checks2">
      <m-radio disabled value="draw">QQ炫舞</m-radio>
      <m-radio value="lol">英雄联盟</m-radio>
      <m-radio disabled value="cf">穿越火线</m-radio>
      <m-radio value="dnf">地下城勇士</m-radio>
    </m-radio-group>
    <br />
    <m-radio-group name="disabled3" v-model="checks3">
      <m-radio disabled value="dou">斗鱼</m-radio>
      <m-radio disabled value="mao">熊猫</m-radio>
      <m-radio disabled value="ya">虎牙</m-radio>
      <m-radio disabled value="zhan">B站</m-radio>
    </m-radio-group>
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
import { disabledCode } from "../doc";
import { ref } from "vue";
const checks1 = ref("");
const checks2 = ref("");
const checks3 = ref("");
</script>
