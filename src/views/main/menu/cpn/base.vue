<template>
  <cpn-play-vue title="isCollapse" description="isCollapse为true可以折叠菜单" :code="baseCode">
    <m-menu :options="menuList" capture="梦中情厂" icon="m-info" isCollapse></m-menu>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="baseVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { baseCode } from "../doc";
const menuList = [
  {
    label: "腾讯",
    value: "tencent",
    icon: "m-tx",
    children: [
      {
        label: "天美",
        value: "timi"
      },
      {
        label: "天游",
        value: "ty"
      },
      {
        label: "腾讯云",
        value: "yun"
      }
    ]
  },
  {
    label: "字节",
    value: "zj",
    icon: "m-dy",
    children: [
      {
        label: "抖音",
        value: "dy"
      },
      {
        label: "皮皮虾",
        value: "ppx"
      },
      {
        label: "西瓜视频",
        value: "xg"
      }
    ]
  },
  {
    label: "阿里",
    value: "al",
    icon: "m-al",
    children: [
      {
        label: "淘宝",
        value: "tb"
      },
      {
        label: "支付宝",
        value: "zfb"
      },
      {
        label: "蚂蚁金服",
        value: "my",
        children: [
          {
            label: "蚂蚁财富",
            value: "cf"
          },
          {
            label: "饿了吗",
            value: "elm"
          }
        ]
      }
    ]
  }
];
</script>
