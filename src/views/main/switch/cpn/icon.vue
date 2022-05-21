<template>
  <cpn-play-vue
    title="checkIconName和unCheckIconName"
    description="checkIconName和unCheckIconName分别设置选中后在圆圈中的图标名，和未选后显示的圆圈中的图标名，同时也可以使用插槽自定义图标插槽名checkIcon和unCheckIcon"
    code="sizeCode"
  >
    <m-switch
      v-model="switchValue1"
      checkValue="花若盛开，蝴蝶自来"
      unCheckValue="加油，每一天"
      checkIconName="m-front"
      unCheckIconName="m-after"
    ></m-switch>
    <p></p>
    <m-switch
      v-model="switchValue2"
      checkIconName="m-file"
      unCheckIconName="m-calendar"
    >
      <template #checked> 选择文件 </template>
      <template #unChecked> 选择文件 </template>
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
const switchValue2 = ref(true);
</script>
<style lang="less" scoped>
p {
  width: 20px;
  display: inline-block;
}
</style>
