<template>
  <div class="card">
    <cpn-header-vue
      title="divider"
      name="分隔线"
      description="将两个内容分隔开来，为什么就不能在一起了"
    >
    </cpn-header-vue>
    <div class="layout">
      <base-vue></base-vue>
      <shape-vue></shape-vue>
      <title-placement-vue></title-placement-vue>
    </div>
  </div>
</template>

<script lang="ts" setup name="card">
/*
 * @Author: bughou
 * @Date: 2022-05-09 18:42:15
 * @Description: 创建一个card组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import shapeVue from "./cpn/shape.vue";
import baseVue from "./cpn/base.vue";
import titlePlacementVue from "./cpn/titlePlacement.vue";
</script>
<style scoped lang="less"></style>
