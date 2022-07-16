<template>
  <div class="card">
    <cpn-header-vue
      title="carousel"
      name="轮播图"
      description="卡片这个应用场景还是挺多的吧"
    >
    </cpn-header-vue>
    <m-carousel showArrow showDot attachment>
      <m-carousel-item>
        <img
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
          alt=""
        />
      </m-carousel-item>
      <m-carousel-item>
        <img
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
          alt=""
        />
      </m-carousel-item>
      <m-carousel-item>
        <img
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
          alt=""
        />
      </m-carousel-item>
      <m-carousel-item>
        <img
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
          alt=""
        />
      </m-carousel-item>
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

<style scoped>
img {
  width: 300px;
  height: 200px;
}
</style>
