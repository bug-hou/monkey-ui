<template>
  <cpn-play-vue title="base" description="" :code="baseCode">
    <m-carousel style="width: 100%; height: 300px">
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
  </cpn-play-vue>
</template>

<script lang="ts" setup name="size">
/*
 * @Author: bughou
 * @Date: 2022-05-09 16:07:00
 * @Description: 创建一个size组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { baseCode } from "../doc";
</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
