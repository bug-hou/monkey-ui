<template>
  <cpn-play-vue
    title="inputDisabled"
    description="inputDisabled为true只是不能进行输入但是可以通过按钮添加减少"
    code="sizeCode"
  >
    <div class="size">
      <m-input-number class="common" v-model="a" inputDisabled></m-input-number>
      <m-input-number
        class="common"
        v-model="a"
        inputDisabled
        controlsPosition="left"
      ></m-input-number>
      <m-input-number
        class="common"
        v-model="a"
        inputDisabled
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
// import { sizeCode } from "../doc";
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
