<template>
  <cpn-play-vue
    title="clamp"
    description="clamp显示多少行文字"
    :code="baseCode"
  >
    <m-form
      placement="left"
      :labelWidth="100"
      labelAlign="left"
      v-model="userInfo"
    >
      <m-form-item label="姓名" name="name" required></m-form-item>
      <m-form-item label="年龄" name="age" required></m-form-item>
      <m-form-item label="性别" name="sex">
        <m-radio-group name="sex" v-model="userInfo.sex">
          <m-radio value="nan">男</m-radio>
          <m-radio value="nv">女</m-radio>
        </m-radio-group>
      </m-form-item>
      <m-form-item label="爱好" name="like">
        <m-check-box-group name="like" v-model="userInfo.like">
          <m-check-box value="swim">游泳</m-check-box>
          <m-check-box value="basketball">篮球</m-check-box>
          <m-check-box value="run">跑步</m-check-box>
          <m-check-box value="YL">她</m-check-box>
        </m-check-box-group>
      </m-form-item>
      <m-form-item label="技术栈" name="stack">
        <template v-for="item in userInfo.stack">
        <m-tag></m-tag> </template>
      </m-form-item>
      <m-form-item label="电话号码" name="phone" required></m-form-item>
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
import { ref } from "vue";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { baseCode } from "../doc";

const userInfo = ref<any>({
  name: "",
  age: 18,
  sex: "nan",
  like: "YL"
});
</script>
