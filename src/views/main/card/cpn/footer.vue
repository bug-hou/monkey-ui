<template>
  <cpn-play-vue
    title="footer"
    description="footer插槽显示一些不太重要的信息"
    :code="footerCode"
  >
    <m-card class="card">
      <template #header> 我是header部分 </template>
      我就是内容，你可以随便写点东西，部分看起来很单调
      <template #footer>我是footer部分</template>
    </m-card>
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
import { footerCode } from "../doc";
</script>
<style scoped lang="less">
.card {
  width: 300px;
}
</style>
