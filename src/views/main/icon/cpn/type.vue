<template>
  <cpn-play-vue
    title="type"
    :code="typeCode"
    description="图标类型default(默认)，success，info，error，warning，primary或者自定义通过color"
  >
    <div class="size">
      <m-icon name="m-upload" type="default"></m-icon>
      <m-icon name="m-upload" type="success"></m-icon>
      <m-icon name="m-upload" type="info"></m-icon>
      <m-icon name="m-upload" type="warning"></m-icon>
      <m-icon name="m-upload" type="error"></m-icon>
      <m-icon name="m-upload" type="primary"></m-icon>
      <m-icon name="m-upload" type="primary" color="pink"></m-icon>
    </div>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="type">
/*
 * @Author: bughou
 * @Date: 2022-05-06 20:31:07
 * @Description: 创建一个type组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { typeCode } from "../doc";
</script>
<style scoped lang="less">
.type {
}
</style>

