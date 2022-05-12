<template>
  <cpn-play-vue
    title="color"
    description="color来设置边框颜色值"
    :code="colorCode"
  >
    <p>我改变了颜色</p>
    <m-divider color="#67c23a"> </m-divider>
    <p>我是#67c23a</p>
    <m-divider color="rgb(48, 170, 105)"> </m-divider>
    <p>当然也可以使用rgb(48, 170, 105)</p>
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
import { colorCode } from "../doc";
</script>
