<template>
  <cpn-play-vue
    title="checkColor和UnCheckColor"
    description="checkColor和UnCheckColor分别设置选中显示的颜色，和未选中显示的颜色"
    :code="colorCode"
  >
    <m-switch
      v-model="switchValue1"
      checkValue="我选择前者"
      unCheckValue="工作，考研"
      checkColor="#faaca8"
      unCheckColor="#ddd6f3"
    ></m-switch>
    <p></p>
    <m-switch
      v-model="switchValue2"
      checkColor="#aa4b6b"
      unCheckColor="#6b6b83"
    >
      <template #checked> <m-icon name="m-star"></m-icon>一星向前 </template>
      <template #unChecked>
        <m-icon name="m-loader"></m-icon>永无循环
      </template>
    </m-switch>
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
import { colorCode } from "../doc";
const switchValue1 = ref(false);
const switchValue2 = ref(false);
</script>
<style lang="less" scoped>
p {
  width: 20px;
  display: inline-block;
}
</style>
