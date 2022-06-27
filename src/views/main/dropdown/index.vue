<template>
  <div class="card">
    <cpn-header-vue
      title="dropdown"
      name="下拉菜单"
      description="将两个内容分隔开来，为什么就不能在一起了"
    >
    </cpn-header-vue>
    <m-dropdown :options="options" :defaultValue="['dm', 'dy', 'wjzdy']">
      <m-button>请选择</m-button>
    </m-dropdown>
    <div class="layout"></div>
  </div>
</template>

<script lang="ts" setup name="card">
/*
 * @Author: bughou
 * @Date: 2022-05-09 18:42:15
 * @Description: 创建一个card组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";

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
