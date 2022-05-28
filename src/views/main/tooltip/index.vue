<template>
  <div class="card">
    <cpn-header-vue
      title="tag"
      name="标签"
      description="标签用来对一些特殊事物起强调作用"
    >
    </cpn-header-vue>
    <div class="layout">
      <effect-vue></effect-vue>
      <trigger-vue></trigger-vue>
      <delay-vue></delay-vue>
      <arrow-vue></arrow-vue>
      <list-vue></list-vue>
      <scroll-vue></scroll-vue>
      <header-vue></header-vue>
      <direction-vue></direction-vue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import effectVue from "./cpn/effect.vue";
import triggerVue from "./cpn/trigger.vue";
import delayVue from "./cpn/delay.vue";
import arrowVue from "./cpn/arrow.vue";
import listVue from "./cpn/list.vue";
import scrollVue from "./cpn/scroll.vue";
import headerVue from "./cpn/header.vue";
import directionVue from "./cpn/direction.vue";
// import sizeVue from "./cpn/size.vue";
// import roundedVue from "./cpn/rounded.vue";
// import typeVue from "./cpn/type.vue";
// import closabledVue from "./cpn/closabled.vue";
// import disabledVue from "./cpn/disabled.vue";
// import contentVue from "./cpn/content.vue";
// import iconVue from "./cpn/icon.vue";
// import colorVue from "./cpn/color.vue";
// import sliderColorVue from "./cpn/sliderColor.vue";
// import shapeVue from "./cpn/shape.vue";
// import multipleVue from "./cpn/multiple.vue";
// import buttonVue from "./cpn/button.vue";
// import moreVue from "./cpn/more.vue";
</script>
<style scoped lang="less"></style>
