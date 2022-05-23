<template>
  <div class="card">
    <cpn-header-vue
      title="pagination"
      name="分页器"
      description="可用用来做分页显示的"
    >
    </cpn-header-vue>
    <div class="layout">
      <size-vue></size-vue>
      <back-vue></back-vue>
      <interval-vue></interval-vue>
    </div>
    <skip-vue></skip-vue>
  </div>
</template>

<script lang="ts" setup name="card">
/*
 * @Author: bughou
 * @Date: 2022-05-09 18:42:15
 * @Description: 创建一个card组件
 */
// 从下载的组件中导入函数
import { ref } from "vue";
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import sizeVue from "./cpn/size.vue";
import backVue from "./cpn/back.vue";
import skipVue from "./cpn/skip.vue";
import intervalVue from "./cpn/interval.vue";
// import contentVue from "./cpn/content.vue";
// import iconVue from "./cpn/icon.vue";
// import disabledVue from "./cpn/disabled.vue";
// import colorVue from "./cpn/color.vue";
// import sliderColorVue from "./cpn/sliderColor.vue";
// import shapeVue from "./cpn/shape.vue";
// import multipleVue from "./cpn/multiple.vue";
// import buttonVue from "./cpn/button.vue";
// import moreVue from "./cpn/more.vue";

const pageSizes = [
  {
    label: "10 每页",
    value: 10
  },
  {
    label: "20 每页",
    value: 20
  },
  {
    label: "30 每页",
    value: 30
  },
  {
    label: "40 每页",
    value: 40
  }
];
const pageSize = ref(10);
const page = ref(1);
</script>
<style scoped lang="less"></style>
