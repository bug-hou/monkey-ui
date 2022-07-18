export const baseCode = `<template>
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
</template>

<style scoped>
img {
width: 100%;
height: 100%;
}
</style>
`;
export const arrowCode = `<template>
  <m-carousel style="width: 100%; height: 300px" show-arrow>
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
</template>

<style scoped>
img {
width: 100%;
height: 100%;
}
</style>
`;
export const attachmentCode = `<template>
  <m-carousel style="width: 100%; height: 300px" mode="vertical" attachment show-arrow>
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
</template>

<style scoped>
img {
width: 100%;
height: 100%;
}
</style>
`;
export const autoplayCode = `<template>
  <m-carousel style="width: 100%; height: 300px" autoplay>
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
</cpn-play-vue>
</template>

<style scoped>
img {
width: 100%;
height: 100%;
}
</style>
`;

export const dotCode = `<template>
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
</template>

<script lang="ts" setup>
import { reactive } from "vue";

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
`;

export const horizationCode = `<template>
  <m-carousel style="width: 100%; height: 300px" mode="horization" show-arrow>
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
</template>

<style scoped>
img {
width: 100%;
height: 100%;
}
</style>
`;

export const opacityCode = `<template>
  <m-carousel style="width: 100%; height: 300px" mode="opacity" show-arrow>
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
</template>

<style scoped>
img {
width: 100%;
height: 100%;
}
</style>
`;

export const scrollCode = `<template>
  <m-carousel
    style="width: 100%; height: 300px"
    mode="horization"
    mosueWheel
    show-arrow
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
</template>

<style scoped>
img {
width: 100%;
height: 100%;
}
</style>
`;
export const sliderCode = `<template>
  <m-carousel style="width: 100%; height: 300px" mode="slider" show-arrow>
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
  </m-carousel>
</template>

<style scoped>
img {
width: 100%;
height: 100%;
}
</style>
`
