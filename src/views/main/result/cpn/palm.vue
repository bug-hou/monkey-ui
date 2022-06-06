<template>
  <cpn-play-vue
    title="palm"
    description="component设置为palm时显示一个手掌"
    :code="cupCode"
  >
    <m-result
      title="403禁止访问"
      component="palm"
      content="你可能需要提升一下权限"
    >
      <template #footer>
        <m-button type="primary">提升权限</m-button>
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
