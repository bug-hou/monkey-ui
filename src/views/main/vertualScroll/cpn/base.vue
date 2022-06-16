<template>
  <cpn-play-vue title="base" description="使用默认配置" :code="baseCode">
    <div class="contain">
      <m-vertual-scroll
        :options="options"
        :maxHeight="300"
        :width="200"
      ></m-vertual-scroll>
    </div>
  </cpn-play-vue>
</template>

<script lang="ts" setup>
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { baseCode } from "../doc";

function getOptions(prefix = "option") {
  let options = [];
  for (let i = 0; i < 1500; i++) {
    options.push(prefix + (i + 1));
  }
  return options;
}

const options = getOptions();
</script>
<style lang="less" scoped>
.contain {
  padding: 10px;
  font-size: 18px;
  border: 1px solid #6666;
  border-radius: 6px;
}
</style>
