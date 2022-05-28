<template>
  <cpn-play-vue
    title="trigger"
    description="trigger设置触发效果hover(默认)，click，在hover条件下，可以设置keepApliveOnHover为false时，提示不能触发hover效果"
    :code="triggerCode"
  >
    <m-tooltip tooltipText="我只不过是站在父母的肩上看风景">
      <m-button>悬停</m-button>
    </m-tooltip>
    <span></span>
    <m-tooltip
      tooltipText="我一定要带着我的父母一起在肩上看风景"
      :keepAliveOnHover="false"
      effect="dark"
    >
      <m-button>悬停(提示无效)</m-button>
    </m-tooltip>
    <span></span>
    <m-tooltip tooltipText="加油，不负韶华" trigger="click">
      <m-button>点击</m-button>
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
import { triggerCode } from "../doc";
</script>
<style lang="less" scoped>
span {
  width: 20px;
  display: inline-block;
}
</style>
