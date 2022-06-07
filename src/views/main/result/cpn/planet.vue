<template>
  <cpn-play-vue title="planet" description="component设置为planet时显示一个行星" :code="planetCode">
    <m-result
      title="瑞文"
      content="断剑重铸之日，骑士归来之时"
      component="planet"
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
import { planetCode } from "../doc";
</script>
