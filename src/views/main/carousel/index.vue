<template>
  <div class="card">
    <cpn-header-vue
      title="carousel"
      name="轮播图"
      description="卡片这个应用场景还是挺多的吧"
    >
    </cpn-header-vue>
    <div class="layout">
      <base-vue></base-vue>
      <arrow-vue></arrow-vue>
      <dot-vue></dot-vue>
      <autoplay-vue></autoplay-vue>
    </div>
  </div>
</template>

<script lang="ts" setup>
/*
 * @Author: bughou
 * @Date: 2022-05-09 18:42:15
 * @Description: 创建一个card组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import baseVue from "./cpn/base.vue";
import arrowVue from "./cpn/arrow.vue";
import dotVue from "./cpn/dot.vue";
import autoplayVue from "./cpn/autoplay.vue";
</script>
