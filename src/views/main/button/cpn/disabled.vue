<template>
  <cpn-play-vue
    title="disabled"
    description="当disabled为true按钮没有用了"
    :code="disabledCode"
  >
    <m-button-group>
      <m-button disabled>我不能点击</m-button>
      <p class="gap"></p>
      <m-button disabled :plain="false">我不能点击</m-button>
    </m-button-group>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="disabled">
/*
 * @Author: bughou
 * @Date: 2022-05-06 16:59:28
 * @Description: 创建一个disabled组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { disabledCode } from "../doc";
</script>
<style scoped lang="less">
.gap {
  display: inline-block;
  width: 30px;
}
</style>
