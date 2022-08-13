<template>
  <cpn-play-vue
    title="clamp"
    description="clamp显示多少行文字"
    :code="baseCode"
  >
    <m-form placement="top" direction="horizontal">
      <m-form-item
        label="姓名"
        name="name"
        :rule="nameRules"
        required
      ></m-form-item>
      <m-form-item
        label="年龄"
        name="age"
        :rule="ageRules"
        required
      ></m-form-item>
      <m-form-item
        label="电话号码"
        name="phone"
        :rule="phoneRules"
        required
      ></m-form-item>
      <template #submit>
        <m-button style="width: 180px; height: 40px" shape="rect"
          >验证</m-button
        >
      </template>
      <template #reset
        ><m-button style="width: 180px; height: 40px" shape="rect"
          >重置</m-button
        >
      </template>
    </m-form>
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
import { baseCode } from "../doc";

const nameRules = [
  {
    rule: /\w+/,
    content: "名字不能为空"
  }
];
const ageRules = [
  {
    rule: /^\d*$/,
    content: "年龄必须由数字组成"
  },
  {
    rule: /\d{1,3}/,
    content: "年龄的范围0～200"
  }
];
const phoneRules = [
   {
    rule: /^\d*$/,
    content: "号码必须由数字组成"
  },
  {
    rule: /\d{11}/,
    content: "电话号码只能为11位"
  }
];
</script>
