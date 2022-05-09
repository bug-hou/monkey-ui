<template>
  <cpn-play-vue
    title="clear"
    description="可能你需要一个一键删除功能只需将clear设置为true"
    :code="clearCode"
  >
    <m-input
      v-model="a"
      clear
      placeholder="你要输入才显示clear按钮哦"
    ></m-input>
    <br />
    <m-input
      v-model="a"
      clear
      prefix=" https://"
      suffix=".com"
      placeholder="我是同时拥有的组件"
    >
    </m-input>
    <br />
    <m-input
      v-model="a"
      type="password"
      password
      placeholder="同时设置了优先显示password"
    ></m-input>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="clearVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个clearVue组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { clearCode } from "../doc";
import { ref } from "vue";
const a = ref("");
</script>
