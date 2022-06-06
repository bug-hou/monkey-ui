<template>
  <div class="card">
    <cpn-header-vue
      title="timeline"
      name="时间线"
      description="用来表示前端学习之路"
    >
    </cpn-header-vue>
    <!-- <m-timeline :horizontal="true" width="1000" isBorder isShadow>
      <m-timeline-item timestamp="2022/1/7" type="default" title="默认">
        我是默认
        <template #icon>
          <m-icon name="m-star"></m-icon>
        </template>
      </m-timeline-item>
      <m-timeline-item
        timestamp="2022/1/27"
        type="info"
        lineStyle="dashed"
        title="信息"
      >
        我是信息
      </m-timeline-item>
      <m-timeline-item
        timestamp="2021/1/31"
        lineStyle="dotted"
        type="warning"
        title="警告"
      >
        我是警告
      </m-timeline-item>
      <m-timeline-item timestamp="2021/1/31" type="success" title="成功">
        我是成功
      </m-timeline-item>
      <m-timeline-item type="primary" timestamp="2021/1/31" title="原色">
        我是原色
      </m-timeline-item>
    </m-timeline> -->
    <div class="layout">
      <base-vue></base-vue>
      <icon-vue></icon-vue>
    </div>
    <horizontal-vue></horizontal-vue>
    <isborder-vue></isborder-vue>
  </div>
</template>

<script lang="ts" setup>
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import baseVue from "./cpn/base.vue";
import iconVue from "./cpn/icon.vue";
import horizontalVue from "./cpn/horizontal.vue";
import isborderVue from "./cpn/isborder.vue";
// import sizeVue from "./cpn/size.vue";
// import roundedVue from "./cpn/rounded.vue";
// import typeVue from "./cpn/type.vue";
// import closabledVue from "./cpn/closabled.vue";
// import disabledVue from "./cpn/disabled.vue";
// import effectVue from "./cpn/effect.vue";
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
