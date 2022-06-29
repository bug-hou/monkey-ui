<template>
  <cpn-play-vue
    title="icon"
    description="只用在options中添加对应的iconName"
    :code="iconCode"
  >
    <m-dropdown :options="options">
      <m-button>图标显示</m-button>
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
import { iconCode } from "../doc";

const options = [
  {
    label: "华尔街之狼",
    value: "hejzl",
    icon: "m-star"
  },
  {
    label: "肖申克的救赎",
    value: "jskdjs",
    icon: "m-success"
  },
  {
    label: "动漫",
    value: "dm",
    icon: "m-warning"
  },
  {
    label: "摔跤吧爸爸",
    value: "sjbbb",
    icon: "m-info"
  }
];
</script>
<style scoped lang="less">
p {
  display: inline-block;
  width: 50px;
}
</style>
