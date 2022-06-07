<template>
  <cpn-play-vue title="prohibit" description="component设置为prohibit时显示一个禁止" :code="prohibitCode">
    <m-result
      title="李青"
      content="双眼失明丝毫不影响我追捕敌人，因为我能闻到他们身上的臭味"
      component="prohibit"
    >
      <template #footer>
        <m-button>下一个</m-button>
      </template>
    </m-result>
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
import { prohibitCode } from "../doc";
</script>
