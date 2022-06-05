<template>
  <cpn-play-vue
    title="disabled"
    description="设置disabled为true就可以对input输入框进行禁止了"
    :code="disabledCode"
  >
    <m-input v-model="a" disabled placeholder="你点不动我了吧"></m-input>
    <br />
    <br />
    <m-input
      v-model="a"
      disabled
      placeholder="你点不动我了吧"
      suffix="禁止"
      prefix="点不了"
    >
    </m-input>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="disabled">
/*
 * @Author: bughou
 * @Date: 2022-05-08 13:53:58
 * @Description: 创建一个disabled组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { disabledCode } from "../doc";
import { ref } from "vue";
const a = ref("");
</script>
