<template>
  <cpn-play-vue title="from和To" description="from和to属性设置" :code="fromCode">
    <p class="header">定一个小目标吧</p>
    <m-number-animation
      :from="from"
      :to="to"
      :fontSize="58"
      showSeparator
    ></m-number-animation>
    <m-divider titlePlacement="left">点击输入 </m-divider>
    <m-input
      v-model="value"
      @keydown.enter="to = value"
      placeholder="按下enter键确认"
    ></m-input>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="baseVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import { ref } from "vue";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { fromCode } from "../doc";
const from = ref(0);
const to = ref(123456789);
const value = ref(to.value);
</script>
<style lang="less" scoped>
.header {
  font-size: 18px;
  font-weight: bold;
}
</style>
