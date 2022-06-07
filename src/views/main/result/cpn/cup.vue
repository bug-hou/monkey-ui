<template>
  <cpn-play-vue title="cup" description="默认属性" :code="cupCode">
    <m-result
      title="404资源不存在"
      content="你可以试着换一个地址从新发送一个请求"
      component="cup"
    >
      <template #footer>
        <m-button type="error">跳转一下</m-button>
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
import { cupCode } from "../doc";
</script>
