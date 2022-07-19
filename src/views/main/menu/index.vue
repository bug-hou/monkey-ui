<template>
  <div class="minput">
    <cpn-header-vue
      title="input"
      name="输入框"
      description="用来做文字的输入"
    ></cpn-header-vue>
    <m-menu :options="menuList"></m-menu>
    <div class="layout"></div>
  </div>
</template>

<script lang="ts" setup name="minput">
/*
 * @Author: bughou
 * @Date: 2022-05-07 16:15:05
 * @Description: 创建一个minput组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
const menuList = [
  {
    label: "腾讯",
    value: "tencent",
    children: [
      {
        label: "天美",
        value: "time"
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
    value: "zijie",
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
            label: "支付宝",
            value: "zfb"
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
