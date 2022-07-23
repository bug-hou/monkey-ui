<template>
  <cpn-play-vue title="path" description="给每一个对象添加上path就可以实现路径的跳转" :code="pathCode">
    <m-menu
      isCollapse
      :options="menuList"
      capture="梦中情厂"
      icon="m-info"
      iconSize="24"
      iconColor="#489ce9"
    ></m-menu>
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
import { pathCode } from "../doc";
const menuList = [
  {
    label: "腾讯",
    value: "tencent",
    icon: "m-tx",
    children: [
      {
        label: "天美",
        value: "timi",
        path: "/component/card"
      },
      {
        label: "天游",
        value: "ty",
        path: "/component/divider"
      },
      {
        label: "腾讯云",
        value: "yun",
        path: "/component/check"
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
        value: "tb",
        path: "/component/carousel"
      },
      {
        label: "支付宝",
        value: "zfb",
        path: "/component/tooltip"
      },
      {
        label: "蚂蚁金服",
        value: "my",
        children: [
          {
            label: "蚂蚁财富",
            value: "cf",
            path: "/component/input"
          },
          {
            label: "饿了吗",
            value: "elm",
            path: "/component/button"
          }
        ]
      }
    ]
  }
];
</script>

