<template>
  <cpn-play-vue
    title="radius"
    description="radius设置弧度值0~10"
    code="sizeCode"
  >
    <m-switch
      v-model="switchValue1"
      checkValue="加油 努力"
      unCheckValue="做什么"
      checkColor="#cd2f4f"
      :radius="7"
    ></m-switch>
    <p></p>
    <m-switch
      v-model="switchValue2"
      unCheckValue="梦想总是遥不可及"
      :radius="3"
      checkValue="我应该去哪里"
    >
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
