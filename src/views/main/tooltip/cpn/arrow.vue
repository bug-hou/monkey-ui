<template>
  <cpn-play-vue
    title="arrow"
    description="设置arrow属性为false可以缺陷箭头"
    :code="arrowCode"
  >
    <m-tooltip tooltipText="没有箭头" :arrow="false">
      <m-button>取消箭头</m-button>
    </m-tooltip>
    <span></span>
    <m-tooltip tooltipText="dark没有箭头" effect="没有箭头" :arrow="false">
      <m-button>取消箭头</m-button>
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
import { arrowCode } from "../doc";
</script>
<style lang="less" scoped>
span {
  width: 20px;
  display: inline-block;
}
</style>

