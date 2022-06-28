<template>
  <cpn-play-vue
    title="direction"
    description="direction设置显示的方向left，right，bottom，top"
    :code="triggerCode"
  >
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
