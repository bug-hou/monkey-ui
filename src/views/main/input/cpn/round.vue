<template>
  <cpn-play-vue
    title="round"
    description="边框变圆设置round为true，或者自定义radius属性"
    :code="roundCode"
  >
    <m-input
      v-model="a"
      placeholder="我是一个圆角输入框"
      round
      suffix="圆角输入框"
    ></m-input>
    <br />
    <m-input v-model="a" radius="20px" placeholder="自定义radius属性">
    </m-input>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="disabled">
/*
 * @Author: bughou
 * @Date: 2022-05-08 13:53:58
 * @Description: 创建一个disabled组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { roundCode } from "../doc";
import { ref } from "vue";
const a = ref("");
</script>
