<template>
  <cpn-play-vue
    title="trigger"
    description="触发方式hover(默认)，click，auto"
    :code="triggerCode"
  >
    <m-dropdown :options="options">
      <m-button>移入显示</m-button>
    </m-dropdown>
    <p></p>
    <m-dropdown :options="options" trigger="auto">
      <m-button>点击失焦</m-button>
    </m-dropdown>
    <p></p>
    <m-dropdown :options="options" trigger="click">
      <m-button>点击显示</m-button>
    </m-dropdown>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="size">
/*
 * @Author: bughou
 * @Date: 2022-05-09 16:07:00
 * @Description: 创建一个size组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { triggerCode } from "../doc";

const options = [
  {
    label: "华尔街之狼",
    value: "hejzl"
  },
  {
    label: "肖申克的救赎",
    value: "jskdjs"
  },
  {
    label: "动漫",
    value: "dm"
  },
  {
    label: "摔跤吧爸爸",
    value: "sjbbb"
  }
];
</script>
<style scoped lang="less">
p {
  display: inline-block;
  width: 50px;
}
</style>
