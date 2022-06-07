<template>
  <cpn-play-vue title="cry" description="component设置为cry时显示一个哭脸" :code="cryCode">
    <m-result
      title="别灰心下一次就能中了"
      content="再接再厉你可以成功的进大厂加油"
      component="cry"
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
import { cryCode } from "../doc";
</script>
