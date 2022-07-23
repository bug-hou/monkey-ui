const js = `<script lang="ts" setup>
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
 </script>`

export const baseCode = `<template>
  <m-menu :options="menuList" capture="梦中情厂" icon="m-info" isCollapse></m-menu>
</template>
${js}
`;

export const iconCode = `
<template>
    <m-menu
      isCollapse
      :options="menuList"
      capture="梦中情厂"
      icon="m-info"
      iconSize="24"
      iconColor="#489ce9"
    ></m-menu>
</template>

${js}
`

export const pathCode = `<template>
  <m-menu
    isCollapse
    :options="menuList"
    capture="梦中情厂"
    icon="m-info"
    iconSize="24"
    iconColor="#489ce9"
  ></m-menu>
</template>

${js}`
