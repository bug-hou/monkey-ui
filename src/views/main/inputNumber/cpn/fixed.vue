<template>
  <cpn-play-vue
    title="max/Min"
    description="max设置最大值，min设置最小值"
    code="maxMinCode"
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
// import { sizeCode } from "../doc";
import { ref } from "vue";
const a = ref(0);
const b = ref(0);
const c = ref(0);
</script>
<style scoped lang="less">
.size {
  .common {
    margin-right: 20px;
  }
}
</style>
