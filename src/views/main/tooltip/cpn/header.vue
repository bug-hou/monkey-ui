<template>
  <cpn-play-vue
    title="header"
    description="header设置标题，如果你想自定义一些样式，可以使用header插槽"
    :code="headerCode"
  >
    <m-tooltip tooltipText="我只不过是站在父母的肩上看风景" header="励志">
      <m-button>header默认</m-button>
    </m-tooltip>
    <span></span>
    <m-tooltip tooltipText="我一定要带着我的父母一起在肩上看风景" effect="dark">
      <m-button>自定义header</m-button>
      <template #header>
        <p style="color: #ccc">励志</p>
      </template>
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
import { headerCode } from "../doc";
</script>
<style lang="less" scoped>
span {
  width: 20px;
  display: inline-block;
}
</style>
