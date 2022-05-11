<template>
  <cpn-play-vue
    title="cover"
    description="cover插槽显示图片很好用"
    :code="imageCode"
  >
    <m-card class="card">
      <template #cover>
        <img src="../config/vue.png" alt="" />
      </template>
      <template #header> VUE </template>
      vue永远滴神哈哈哈哈哈(纯娱乐不迎战)
    </m-card>
    <m-card class="card">
      <template #cover>
        <img src="../config/react.png" alt="" />
      </template>
      <template #header> REACT </template>
      react也很好用，我要卷加油
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
import { imageCode } from "../doc";
</script>
<style scoped lang="less">
.card {
  width: 250px;
  display: inline-block;
  margin-left: 10px;
  &:first-child {
    margin-left: 0;
  }
}
img {
  width: 100%;
}
</style>
