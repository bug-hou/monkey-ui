<template>
  <cpn-play-vue title="ghost" description="component设置为ghost时显示一个鬼脸" :code="ghostCode">
    <m-result
      title="剑圣"
      content="真正的大师永远怀着一颗学徒的心。你的剑就是我的剑！"
      component="ghost"
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
import { ghostCode } from "../doc";
</script>
