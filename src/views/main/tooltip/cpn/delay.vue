<template>
  <cpn-play-vue
    title="delay和Duration"
    description="delay设置延迟单位毫秒，duration设置持续时间"
    :code="delayCode"
  >
    <m-tooltip tooltipText="我有延迟效果，延迟500毫秒" :delay="500">
      <m-button>延迟 500ms</m-button>
    </m-tooltip>
    <span></span>
    <m-tooltip tooltipText="离开后持续500毫秒" effect="dark" :duration="500">
      <m-button>持续 500ms</m-button>
    </m-tooltip>
    <span></span>
    <m-tooltip
      tooltipText="延迟500毫秒，离开后持续500毫秒"
      effect="dark"
      :duration="500"
      :delay="500"
    >
      <m-button>延迟 500ms 持续 500ms</m-button>
    </m-tooltip>
  </cpn-play-vue>
</template>

<script lang="ts" setup>
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { delayCode } from "../doc";
</script>
<style lang="less" scoped>
span {
  width: 20px;
  display: inline-block;
}
</style>
