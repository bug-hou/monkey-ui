<template>
  <div>
    <cpn-header-vue title="cascader" name="级联选择" description="用来选择多个">
    </cpn-header-vue>
    <m-cascader :options="options" v-model="value" multiple></m-cascader>
    <div class="layout"></div>
  </div>
</template>

<script lang="ts" setup name="card">
/*
 * @Author: bughou
 * @Date: 2022-05-09 18:42:15
 * @Description: 创建一个card组件
 */
// 从下载的组件中导入函数
import { ref } from "vue";
import { Options } from "../../../../lib/packages/cascader/config/type";
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
// import sizeVue from "./cpn/size.vue";
// import disabledVue from "./cpn/disabled.vue";
// import buttonVue from "./cpn/button.vue";
// import maxVue from "./cpn/max.vue";

function getOptions(depth = 3, iterator = 1, prefix = "") {
  const length = 12;
  const options: Options[] = [];
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `v-${i}`,
        label: `l-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, "" + String(i))
      });
    } else if (iterator === depth) {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0
      });
    } else {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${prefix}-${i}`)
      });
    }
  }
  return options;
}
const value = ref(["v-1/v-1-1/v-1-1-1", "v-1/v-1-1/v-1-1-2"]);
const options = getOptions();
</script>
<style scoped lang="less"></style>
