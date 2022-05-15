<template>
  <cpn-play-vue title="step" description="step设置步长默认为1" :code="stepCode">
    <div class="size">
      <m-input-number
        class="common"
        v-model="a"
        :step="2"
        controlsPosition="left"
      ></m-input-number>
      <m-input-number
        class="common"
        :step="10"
        v-model="b"
        controlsPosition="right"
      ></m-input-number>
      <m-input-number class="common" :step="5" v-model="c"></m-input-number>
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
import { stepCode } from "../doc";
import { ref } from "vue";
const a = ref(10);
const b = ref(5);
const c = ref(8);
</script>
<style scoped lang="less">
.size {
  display: flex;
  .common {
    margin-right: 20px;
  }
}
</style>
