<template>
  <cpn-play-vue
    title="size"
    description="只有大小不一样，size支持mini，small，medium"
    :code="sizeCode"
  >
    <m-tag size="mini">天道酬勤</m-tag>
    <span></span>
    <m-tag size="mini">恒则必远</m-tag>
    <span></span>
    <m-tag size="small">功不唐娟</m-tag>
    <span></span>
    <m-tag size="small">玉汝于成</m-tag>
    <span></span>
    <m-tag size="medium">岁月不负追梦人</m-tag>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="baseVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import { ref } from "vue";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { sizeCode } from "../doc";
const switchValue = ref(true);
</script>
<style lang="less" scoped>
span {
  width: 20px;
  display: inline-block;
}
</style>
