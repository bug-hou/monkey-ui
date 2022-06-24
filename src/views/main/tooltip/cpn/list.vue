<template>
  <cpn-play-vue
    title="tooltipText"
    description="当tooltipText的值为一个数组时显示多个，使用column来表示一行显示多少列"
    :code="listCode"
  >
    <m-tooltip :tooltipText="list" :columns="3">
      <m-button>tooltipText为一个数组</m-button>
    </m-tooltip>
    <span></span>
    <m-tooltip :tooltipText="list" :columns="1">
      <m-button>tooltipText为一个数组</m-button>
    </m-tooltip>
  </cpn-play-vue>
</template>

<script lang="ts" setup>
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { listCode } from "../doc";

const list = ["http", "icmp", "dhcp", "ftp", "smtp", "dns", "udp"];
</script>
<style lang="less" scoped>
span {
  width: 20px;
  display: inline-block;
}
</style>
