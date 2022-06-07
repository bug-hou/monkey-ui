<template>
  <div class="card">
    <cpn-header-vue
      title="result"
      name="结果"
      description="用来做一些小的页面还是很快的"
    >
    </cpn-header-vue>
    <div class="layout">
      <cup-vue></cup-vue>
      <small-vue></small-vue>
      <palm-vue></palm-vue>
      <cry-vue></cry-vue>
      <prohibit-vue></prohibit-vue>
      <planet-vue></planet-vue>
      <ghost-vue></ghost-vue>
      <img-vue></img-vue>
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
import cupVue from "./cpn/cup.vue";
import smallVue from "./cpn/small.vue";
import palmVue from "./cpn/palm.vue";
import cryVue from "./cpn/cry.vue";
import prohibitVue from "./cpn/prohibit.vue";
import planetVue from "./cpn/planet.vue";
import ghostVue from "./cpn/ghost.vue";
import imgVue from "./cpn/img.vue";
</script>
<style scoped lang="less"></style>
