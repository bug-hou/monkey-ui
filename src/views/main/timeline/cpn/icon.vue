<template>
  <cpn-play-vue
    title="icon"
    description="使用icon插槽代替圆圈"
    :code="iconCode"
  >
    <m-timeline>
      <m-timeline-item
        timestamp="2022/6/6 15:04:55"
        type="default"
        title="默认"
      >
        <template #icon>
          <m-icon name="m-star"></m-icon>
        </template>
        我是默认
      </m-timeline-item>
      <m-timeline-item
        timestamp="2022/6/6 15:04:55"
        type="info"
        lineStyle="dashed"
        title="信息"
      >
        <template #icon>
          <m-icon name="m-star"></m-icon>
        </template>
        我是信息
      </m-timeline-item>
      <m-timeline-item
        timestamp="2022/6/6 15:04:55"
        type="warning"
        title="警告"
      >
        <template #icon>
          <m-icon name="m-star"></m-icon>
        </template>
        我是警告
      </m-timeline-item>
      <m-timeline-item
        timestamp="2022/6/6 15:04:55"
        type="success"
        title="成功"
      >
        <template #icon>
          <m-icon name="m-star"></m-icon>
        </template>
        我是成功
      </m-timeline-item>
      <m-timeline-item
        type="primary"
        timestamp="2022/6/6 15:04:55"
        title="原色"
      >
        <template #icon>
          <m-icon name="m-star"></m-icon>
        </template>
        我是原色
      </m-timeline-item>
    </m-timeline>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="baseVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { iconCode } from "../doc";
</script>
