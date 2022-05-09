<template>
  <cpn-play-vue
    title="size"
    :code="sizeCode"
    description="以下四种供军选择mini，small(默认)，medium，big，当然你可以自定义css样式"
  >
    <m-button-group class="size">
      <m-button shape="round" size="mini" type="success">小小按钮</m-button>
      <m-button shape="round" size="small" type="error">小按钮</m-button>
      <m-button shape="round" size="medium" type="primary">中等按钮</m-button>
      <m-button shape="round" size="big" type="info">大大的按钮</m-button>
    </m-button-group>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="butonSize">
/*
 * @Author: bughou
 * @Date: 2022-05-06 16:21:31
 * @Description: 创建一个butonSize组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { sizeCode } from "../doc";
</script>
<style scoped lang="less">
.butonSize {
}
</style>
