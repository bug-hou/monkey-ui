<template>
  <cpn-play-vue title="small" description="component设置为small时显示一个笑脸" :code="cupCode">
    <m-result
      title="恭喜你答对了"
      content="我于杀戮之中绽放，亦如黎明中的花朵"
      component="small"
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
import { cupCode } from "../doc";
</script>
