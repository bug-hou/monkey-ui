export const triggerCode = `<template>
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
</template>

<script lang="ts" setup>

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
`;
export const collapseCode = `<template>
  <m-dropdown :options="options">
    <m-button>练级选择</m-button>
  </m-dropdown>
</template>

<script lang="ts" setup>

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
`
export const directionCode = `<template>
  <p></p>
  <m-dropdown :options="options" direction="left">
    <m-button>右边</m-button>
  </m-dropdown>
  <p></p>
  <m-dropdown :options="options" direction="top">
    <m-button>上边</m-button>
  </m-dropdown>
  <p></p>
  <m-dropdown :options="options" direction="bottom">
    <m-button>下边</m-button>
  </m-dropdown>
  <p></p>
  <m-dropdown :options="options" direction="right">
    <m-button>左边</m-button>
  </m-dropdown>
</template>

<script lang="ts" setup>

const options = [
{
  label: "button",
  value: "hejzl"
},
{
  label: "collapse",
  value: "jskdjs"
},
{
  label: "input",
  value: "dm"
},
{
  label: "result",
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
`

export const iconCode = `<template>
  <m-dropdown :options="options">
    <m-button>图标显示</m-button>
  </m-dropdown>
</template>

<script lang="ts" setup>

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
`
