<template>
  <cpn-play-vue
    title="disabled"
    description="disabled为true就被禁止了"
    :code="disabledCode"
  >
    <div class="size">
      <m-input-number class="common" v-model="a" disabled></m-input-number>
      <m-input-number
        class="common"
        v-model="a"
        disabled
        controlsPosition="left"
      ></m-input-number>
      <m-input-number
        class="common"
        v-model="a"
        disabled
        controlsPosition="right"
      ></m-input-number>
    </div>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="baseVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { disabledCode } from "../doc";
import { ref } from "vue";
const a = ref(1);
</script>
<style scoped lang="less">
.size {
  display: flex;
  .common {
    margin-right: 20px;
  }
}
</style>
