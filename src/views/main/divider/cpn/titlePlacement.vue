<template>
  <cpn-play-vue
    title="titlePlacement"
    description="你可以把文字放在你喜欢的文字left，center(默认)，right"
    :code="titlePlacementCode"
  >
    <m-divider titlePlacement="center"> 中间 </m-divider>
    <br />
    <m-divider titlePlacement="right"> 右边 </m-divider>
    <br />
    <m-divider titlePlacement="left"> 左边 </m-divider>
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
import { titlePlacementCode } from "../doc";
</script>
