<template>
  <cpn-play-vue
    title="max/Min"
    description="max设置最大值，min设置最小值"
    :code="maxMinCode"
  >
    <div class="size">
      <m-input-number class="common" v-model="a" :max="10"></m-input-number>
      <m-input-number class="common" :min="1" v-model="b"></m-input-number>
      <m-input-number
        class="common"
        v-model="c"
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
import { maxMinCode } from "../doc";
import { ref } from "vue";
const a = ref(0);
const b = ref(0);
const c = ref(0);
</script>
<style scoped lang="less">
.size {
  display: flex;
  .common {
    margin-right: 20px;
  }
}
</style>
