<template>
  <cpn-play-vue
    title="clear"
    description="可能你需要一个一键删除功能只需将clear设置为true"
    :code="sizeCode"
  >
    <m-input v-model="a" clear></m-input>
    <m-input v-model="a" clear suffix prefix>
      <template #prefix> https:// </template>
      <template #suffix> .com </template>
    </m-input>
    <m-input v-model="a" type="password" password></m-input>
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
import { sizeCode } from "../doc";
import { ref } from "vue";
const a = ref("");
</script>
<style scoped lang="less">
.clear {
}
</style>
