<template>
  <cpn-play-vue title="base" description="全部使用默认属性" code="">
    <p>我什么也没设置</p>
    <m-divider> </m-divider>
    <p>十分的朴实无华</p>
    <m-divider> </m-divider>
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
// import { colorCode } from "../doc";
</script>
<style scoped lang="less">
.card {
  width: 300px;
}
</style>
