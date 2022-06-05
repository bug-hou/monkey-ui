<template>
  <div class="card">
    <cpn-header-vue
      title="timeline"
      name="时间线"
      description="用来表示前端学习之路"
    >
    </cpn-header-vue>
    <bg-timeline>
      <template #title>bgUI组件事件线</template>
      <bg-timeline-item timestamp="2022/1/7" type="info">
        开始制作bgUI组件库
      </bg-timeline-item>
      <bg-timeline-item timestamp="2022/1/27" type="success">
        bgUI组件库大致完成(第一版)
      </bg-timeline-item>
      <bg-timeline-item timestamp="2021/1/31" type="warning">
        对代码进行简化，对css样式进行整合，对各个组件进行白盒测试
      </bg-timeline-item>
      <bg-timeline-item timestamp="2021/2/10" type="success">
        完成!!!太棒了，真的，重新对每个组件进行局部修改
      </bg-timeline-item>
    </bg-timeline>
    <div class="layout"></div>
  </div>
</template>

<script lang="ts" setup>
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
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
