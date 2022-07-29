<template>
  <cpn-play-vue
    title="bottom"
    description="设置距离下部分多少距离时改变为absolute布局"
    :code="baseCode"
  >
    <m-alert>
      <template #title> 重要通知 </template>
      <m-list type="disc">
        <m-list-item>
          让企业普惠上云，云服务器最低至2.5折，还有更多产品更低折扣满足您的需求
        </m-list-item>
        <m-list-item>
          小程序云服务器有奖内测中，即刻成为产品体验官
        </m-list-item>
        <m-list-item>
          让企业普惠上云，云服务器最低至2.5折，还有更多产品更低折扣满足您的需求
        </m-list-item>
      </m-list>
    </m-alert>
  </cpn-play-vue>
</template>

<script lang="ts" setup>
/*
 * @Author: bughou
 * @Date: 2022-05-09 16:07:00
 * @Description: 创建一个size组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { baseCode } from "../doc";
</script>
<style scoped lang="less">
.box {
  height: 200px;
  overflow-y: scroll;
}
</style>
