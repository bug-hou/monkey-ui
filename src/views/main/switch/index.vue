<template>
  <div class="card">
    <cpn-header-vue
      title="select"
      name="选择器"
      description="select选择器在多个选项中选择多个或者一个，"
    >
    </cpn-header-vue>
    <div class="layout">
      <size-vue></size-vue>
      <content-vue></content-vue>
      <icon-vue></icon-vue>
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
import sizeVue from "./cpn/size.vue";
import contentVue from "./cpn/content.vue";
import iconVue from "./cpn/icon.vue";
// import multipleVue from "./cpn/multiple.vue";
// import disabledVue from "./cpn/disabled.vue";
// import buttonVue from "./cpn/button.vue";
// import moreVue from "./cpn/more.vue";
</script>
<style scoped lang="less"></style>
