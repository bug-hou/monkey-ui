<template>
  <cpn-play-vue
    title="sliderColor和color"
    description="sliderColor来设置滑块的颜色，color设置字体颜色"
    code="sizeCode"
  >
    <m-switch
      v-model="switchValue1"
      checkValue="我选择前者"
      unCheckValue="工作，考研"
      checkColor="#faaca8"
      unCheckColor="#ddd6f3"
      sliderColor="#FFEFBA2f"
      color="#000b"
    ></m-switch>
    <p></p>
    <m-switch
      v-model="switchValue2"
      checkColor="#aa4b6b"
      unCheckColor="#6b6b83"
      sliderColor="#FFEFBA2f"
      size="medium"
      color="#D3CCE3F5"
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
// import { sizeCode } from "../doc";
const switchValue1 = ref(false);
const switchValue2 = ref(false);
</script>
<style lang="less" scoped>
p {
  width: 20px;
  display: inline-block;
}
</style>
