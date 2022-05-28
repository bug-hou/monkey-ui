<template>
  <cpn-play-vue
    title="direction"
    description="direction设置提示方向top(默认),left,bottom,right"
    :code="directionCode"
  >
    <m-tooltip tooltipText="我在左边" direction="left">
      <m-button>左边</m-button>
    </m-tooltip>
    <span></span>
    <m-tooltip tooltipText="我在上边" effect="dark" direction="top">
      <m-button>上边</m-button>
    </m-tooltip>
    <span></span>
    <m-tooltip tooltipText="我在下边" effect="dark" direction="bottom">
      <m-button>下边</m-button>
    </m-tooltip>
    <span></span>
    <m-tooltip tooltipText="我在右边" effect="dark" direction="right">
      <m-button>右边</m-button>
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
import { directionCode } from "../doc";
</script>
<style lang="less" scoped>
span {
  width: 20px;
  display: inline-block;
}
</style>
