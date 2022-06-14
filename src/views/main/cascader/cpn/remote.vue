<template>
  <cpn-play-vue
    title="remote"
    description="当remote为true会等待数据更新，有点复杂我太LOW了不好意思"
    :code="remoteCode"
  >
    <m-cascader
      :options="options"
      v-model="value"
      multiple
      remote
      @load="loadHandle"
      :loadOption="loadOption"
      placeholder="请选择"
      direction="top"
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
import { remoteCode } from "../doc";
import { reactive, ref } from "vue";

function getOptions(deep = 1, count = 2) {
  let templateLabel = "l-";
  let templateValue = "v-";
  for (let i = 0; i < deep; i++) {
    let start = Math.ceil(Math.random() * 100);
    templateLabel += start + "-";
    templateValue += start + "-";
  }
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({
      label: templateLabel + i,
      value: templateValue + i,
      children: deep !== 3 ? [] : undefined,
      disabled: false,
      deep
    });
  }
  return result;
}
const value = reactive(["v-1/v-1-1/v-1-1-1", "v-1/v-1-1/v-1-1-2"]);

const options = getOptions();

const loadOption = ref<any[]>([]);

function loadHandle(item: any) {
  const deep = item.deep + 1;
  setTimeout(() => {
    loadOption.value = getOptions(deep, 12);
  }, 2000);
}
</script>
