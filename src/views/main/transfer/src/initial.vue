<template>
  <cpn-play-vue
    title="initial"
    description="设置最开始要选择的值"
    :code="initialCode"
  >
    <m-transfer
      v-model:originOptions="originOptions"
      v-model:targetOptions="targetOttions"
      :originValue="originValue"
      :targetValue="targetValue"
    ></m-transfer>
  </cpn-play-vue>
</template>

<script lang="ts" setup>
/*
 * @Author: bughou
 * @Date: 2022-06-17 20:48:25
 * @Description: 创建一个组件
 */
// 从下载的组件中导入函数
import { reactive } from "vue";
import { initialCode } from "../doc";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";

function getOptions(prefix = "option") {
  let options = [];
  for (let i = 0; i < 50; i++) {
    const obj: any = {
      label: prefix + (i + 1),
      value: "v-" + prefix + (i + 1),
      disabled: !Math.round(Math.random() * 3)
    };
    options.push(obj);
  }
  return options;
}

const originOptions = reactive(getOptions());
const targetOttions = reactive(getOptions("target"));

const originValue = ["v-option5"];
const targetValue = ["v-target1"];
</script>
<style scoped lang="less"></style>
