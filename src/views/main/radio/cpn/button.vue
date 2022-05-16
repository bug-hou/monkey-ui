<template>
  <cpn-play-vue
    title="button"
    description="button为true将某些选择框禁用"
    :code="buttonCode"
  >
    <m-radio-group name="buttonmini" v-model="checks1" button>
      <m-radio value="m1">腾讯</m-radio>
      <m-radio value="m2">字节</m-radio>
      <m-radio value="m3">阿里</m-radio>
      <m-radio value="m4">百度</m-radio>
    </m-radio-group>
    <br />
    <m-radio-group name="buttonsmall" v-model="checks2" button>
      <m-radio disabled value="draw">QQ炫舞</m-radio>
      <m-radio value="lol">英雄联盟</m-radio>
      <m-radio disabled value="cf">穿越火线</m-radio>
      <m-radio value="dnf">地下城勇士</m-radio>
    </m-radio-group>
    <br />
    <m-radio-group name="buttonmedium" v-model="checks3" button>
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
import { buttonCode } from "../doc";
import { ref } from "vue";
const checks1 = ref("");
const checks2 = ref("");
const checks3 = ref("");
</script>
