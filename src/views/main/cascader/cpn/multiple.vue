<template>
  <cpn-play-vue
    title="multiple"
    description="当multiple属性为true就可以多选了"
    :code="multipleCode"
  >
    <m-cascader :options="options" v-model="value" multiple></m-cascader>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="size">
/*
 * @Author: bughou
 * @Date: 2022-05-09 16:07:00
 * @Description: 创建一个size组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { multipleCode } from "../doc";
import { reactive } from "vue";
function getOptions(depth = 3, iterator = 1, prefix = ""): any {
  const length = 12;
  const options = [];
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
const value = reactive(["v-1/v-1-1/v-1-1-1", "v-1/v-1-1/v-1-1-2"]);

const options = getOptions();
</script>
