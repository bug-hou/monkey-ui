<template>
  <cpn-play-vue
    title="labelRule"
    description="labelRule设置如何显示值child，all(默认)，parent三种类型"
    :code="sizeCode"
  >
    <m-radio-group name="buttonmini" v-model="labelRule" button>
      <m-radio value="all">ALL</m-radio>
      <m-radio value="child">CHILD</m-radio>
      <m-radio value="parent">PARENT</m-radio>
    </m-radio-group>
    <br />
    <m-cascader
      :options="options"
      v-model="value"
      multiple
      :labelRule="labelRule"
    ></m-cascader>
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
import { sizeCode } from "../doc";
import { reactive, ref } from "vue";
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

const labelRule = ref("all");
</script>
<style scoped lang="less">
.card {
  display: inline-block;
  width: 240px;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
