<template>
  <cpn-play-vue
    title="fixed"
    description="fixed用来保留小数位，默认为0"
    :code="fixedCode"
  >
    <div class="size">
      <m-input-number
        class="common"
        v-model="a"
        :max="10"
        :fixed="2"
        controlsPosition="left"
      ></m-input-number>
      <m-input-number
        class="common"
        :min="1"
        :fixed="2"
        v-model="b"
        controlsPosition="right"
      ></m-input-number>
      <m-input-number
        class="common"
        v-model="c"
        :fixed="2"
        :max="10"
        :min="1"
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
import { fixedCode } from "../doc";
import { ref } from "vue";
const a = ref(1.25);
const b = ref(5.23);
const c = ref(8.23);
</script>
<style scoped lang="less">
.size {
  display: flex;
  .common {
    margin-right: 20px;
  }
}
</style>
