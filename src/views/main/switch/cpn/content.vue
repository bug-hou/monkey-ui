<template>
  <cpn-play-vue
    title="checkValue和UnCheckValue"
    description="checkValue和UnCheckValue分别设置选中显示的值，和未选中显示的值，同时也可以使用插槽自定义样式插槽名:checked和unChecked"
    :code="contentCode"
  >
    <m-switch
      v-model="switchValue1"
      checkValue="花若盛开，蝴蝶自来"
      unCheckValue="加油，每一天"
    ></m-switch>
    <p></p>
    <m-switch v-model="switchValue2">
      <template #checked> <m-icon name="m-file"></m-icon>选择文件 </template>
      <template #unChecked>
        <m-icon name="m-calendar"></m-icon>选择日历
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
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { contentCode } from "../doc";
import { ref } from "vue";
const switchValue1 = ref(false);
const switchValue2 = ref(true);
</script>
<style lang="less" scoped>
p {
  width: 20px;
  display: inline-block;
}
</style>
