<template>
  <cpn-play-vue
    title="shape"
    description="分隔线还有很多样式solid(默认)实线，dashed虚线，dotted点线"
    code=""
  >
    <m-divider> 实线 </m-divider>
    <br />
    <m-divider shape="dashed"> 虚线 </m-divider>
    <br />
    <m-divider shape="dotted"> 点线 </m-divider>
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
