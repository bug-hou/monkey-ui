<template>
  <cpn-play-vue
    title="bottom"
    description="设置距离下部分多少距离时改变为absolute布局"
    :code="baseCode"
  >
    <m-alert type="default"> 默认版，我是一个提示框用来有重要声明的 </m-alert>
    <br />
    <m-alert type="info"> 信息版，我是一个提示框用来有重要声明的 </m-alert>
    <br />
    <m-alert type="primary"> 初始版，我是一个提示框用来有重要声明的 </m-alert>
    <br />
    <m-alert type="warning"> 警告版，我是一个提示框用来有重要声明的 </m-alert>
    <br />
    <m-alert type="success"> 成功版，我是一个提示框用来有重要声明的 </m-alert>
    <br />
    <m-alert type="error"> 错误版，我是一个提示框用来有重要声明的 </m-alert>
    <br />
    <m-alert color="#000" background="rgb(240,245,249)">
      自定义版，我是一个提示框用来有重要声明的
    </m-alert>
  </cpn-play-vue>
</template>

<script lang="ts" setup>
/*
 * @Author: bughou
 * @Date: 2022-05-09 16:07:00
 * @Description: 创建一个size组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { baseCode } from "../doc";
</script>
<style scoped lang="less">
.box {
  height: 200px;
  overflow-y: scroll;
}
</style>
