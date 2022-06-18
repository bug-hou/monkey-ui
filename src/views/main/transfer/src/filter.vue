<template>
  <cpn-play-vue
    title="filterable"
    description="可以对数据进行简单的过滤"
    :code="filterCode"
  >
    <m-transfer
      :height="250"
      :width="200"
      v-model:originOptions="originOptions"
      v-model:targetOptions="targetOttions"
      filterable
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
import { filterCode } from "../doc";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";

function getOptions(prefix = "option") {
  let options = [];
  for (let i = 0; i < 10; i++) {
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
</script>
<style scoped lang="less"></style>
