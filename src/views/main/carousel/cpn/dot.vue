<template>
  <cpn-play-vue
    title="show-dot"
    description="设置show-dot为false隐藏指示点"
    :code="baseCode"
  >
    <m-radio-group button name="dotStyle" v-model="info.dotStyle">
      <m-radio value="round">round</m-radio>
      <m-radio value="line">line</m-radio>
    </m-radio-group>
    <br />
    <m-radio-group button name="dotPlacement" v-model="info.dotPlacement">
      <m-radio value="top">top</m-radio>
      <m-radio value="right">right</m-radio>
      <m-radio value="bottom">bottom</m-radio>
      <m-radio value="left">left</m-radio>
    </m-radio-group>
    <br />
    <m-switch
      v-model="info.showArrow"
      checkValue="show arrow"
      unCheckValue="no arrow"
    ></m-switch>
    <br />
    <m-carousel
      style="width: 100%; height: 300px"
      :show-arrow="info.showArrow"
      :mode="info.mode"
      :dot-placement="info.dotPlacement"
      :dotStyle="info.dotStyle"
    >
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
import { reactive } from "vue";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { baseCode } from "../doc";

const info = reactive({
  showArrow: false,
  dotStyle: "line",
  dotPlacement: "bottom",
  mode: "vertical"
});
</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
