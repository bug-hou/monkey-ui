<template>
  <cpn-play-vue
    title="header"
    description="自定义header插件"
    :code="imgCode"
  >
    <m-result
      title="403禁止访问"
      component="palm"
      content="你可能需要提升一下权限"
    >
      <template #header>
        <img
          src="https://game.gtimg.cn/images/lol/act/img/skinloading/157000.jpg"
          alt="亚索"
          style="height: 160px;width: 160px;"
        />
      </template>
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
import { imgCode } from "../doc";
</script>
