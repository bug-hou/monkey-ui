<template>
  <cpn-play-vue
    title="disabled"
    description="禁止switch被点击选择"
    :code="disabledCode"
  >
    <m-switch
      v-model="switchValue"
      unCheckValue="凯文杜兰特不相信黑夜将至"
      checkValue="因为火把在他手上"
    ></m-switch>
    <p></p>
    <m-switch v-model="switchValue" disabled> </m-switch>
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
import { disabledCode } from "../doc";
const switchValue = ref(false);
</script>
<style lang="less" scoped>
p {
  width: 20px;
  display: inline-block;
}
</style>
