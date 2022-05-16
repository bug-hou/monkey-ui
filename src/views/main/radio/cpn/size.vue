<template>
  <cpn-play-vue
    title="size"
    description="只有大小不一样，size支持mini，small，medium,你如果设置在group中一下会被传递，但是可以覆盖"
    :code="sizeCode"
  >
    <m-radio-group name="mini" v-model="checks1" size="mini">
      <m-radio value="m1">腾讯</m-radio>
      <m-radio value="m2">字节</m-radio>
      <m-radio value="m3">阿里</m-radio>
      <m-radio value="m4">百度</m-radio>
    </m-radio-group>
    <br />
    <m-radio-group name="small" v-model="checks2" size="small">
      <m-radio value="draw">QQ炫舞</m-radio>
      <m-radio value="lol">英雄联盟</m-radio>
      <m-radio value="cf">穿越火线</m-radio>
      <m-radio value="dnf">地下城勇士</m-radio>
    </m-radio-group>
    <br />
    <m-radio-group name="medium" v-model="checks3" size="medium">
      <m-radio value="dou">斗鱼</m-radio>
      <m-radio value="mao">熊猫</m-radio>
      <m-radio value="ya">虎牙</m-radio>
      <m-radio value="zhan">B站</m-radio>
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
import { sizeCode } from "../doc";
import { ref } from "vue";
const checks1 = ref("m1");
const checks2 = ref("lol");
const checks3 = ref("ya");
</script>
