<template>
  <cpn-play-vue
    title="effect"
    description="effect可选择值为light(默认)，dark"
    :code="effectCode"
  >
    <m-tooltip tooltipText="我是light主题">
      <m-button>主题较亮</m-button>
    </m-tooltip>
    <span></span>
    <m-tooltip tooltipText="我是dark主题" effect="dark">
      <m-button>主题较暗</m-button>
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
import { effectCode } from "../doc";
</script>
<style lang="less" scoped>
span {
  width: 20px;
  display: inline-block;
}
</style>
