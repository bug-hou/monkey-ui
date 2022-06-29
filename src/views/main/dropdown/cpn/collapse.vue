<template>
  <cpn-play-vue
    title="collapse"
    description="在options数据设置了children就自动显示多级"
    :code="collapseCode"
  >
    <m-dropdown :options="options">
      <m-button>练级选择</m-button>
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
import { collapseCode } from "../doc";

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
    value: "dm",
    icon: "m-star",
    children: [
      {
        label: "斗破苍穹",
        value: "dpcq"
      },
      {
        label: "电影",
        value: "dy",
        children: [
          {
            label: "灵魂小提琴",
            value: "lhxtq"
          },
          {
            label: "玩具总动员",
            value: "wjzdy"
          }
        ]
      }
    ]
  },
  {
    label: "摔跤吧爸爸",
    value: "sjbbb"
  }
];
</script>
