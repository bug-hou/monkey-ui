<template>
  <div class="card">
    <cpn-header-vue
      title="carousel"
      name="轮播图"
      description="卡片这个应用场景还是挺多的吧"
    >
    </cpn-header-vue>
    <m-carousel>
      <m-carousel-item style="background-color: #0ff"></m-carousel-item>
      <m-carousel-item style="background-color: #f0f"></m-carousel-item>
      <m-carousel-item style="background-color: #ff0"></m-carousel-item>
      <m-carousel-item style="background-color: #fff"></m-carousel-item>
    </m-carousel>
    <div class="layout"></div>
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
</script>
