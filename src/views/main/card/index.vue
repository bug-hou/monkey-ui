<template>
  <div class="card">
    <cpn-header-vue
      title="card"
      name="卡片"
      description="卡片这个应用场景还是挺多的吧"
    >
    </cpn-header-vue>
    <div class="layout">
      <type-vue></type-vue>
      <image-vue></image-vue>
      <footer-vue></footer-vue>
      <custom-vue></custom-vue>
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
import typeVue from "./cpn/type.vue";
import imageVue from "./cpn/image.vue";
import footerVue from "./cpn/footer.vue";
import customVue from "./cpn/custom.vue";
</script>
<style scoped lang="less"></style>
