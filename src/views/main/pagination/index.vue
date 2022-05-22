<template>
  <div class="card">
    <cpn-header-vue
      title="pagination"
      name="分页器"
      description="可用用来做分页显示的"
    >
    </cpn-header-vue>
    <m-pagination></m-pagination>
    <br />
    <br />
    <m-pagination :useBack="false"></m-pagination>
    <div class="layout"></div>
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
// import sizeVue from "./cpn/size.vue";
// import contentVue from "./cpn/content.vue";
// import iconVue from "./cpn/icon.vue";
// import disabledVue from "./cpn/disabled.vue";
// import colorVue from "./cpn/color.vue";
// import sliderColorVue from "./cpn/sliderColor.vue";
// import shapeVue from "./cpn/shape.vue";
// import multipleVue from "./cpn/multiple.vue";
// import buttonVue from "./cpn/button.vue";
// import moreVue from "./cpn/more.vue";
</script>
<style scoped lang="less"></style>
