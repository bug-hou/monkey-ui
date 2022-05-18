<template>
  <cpn-play-vue
    title="disabled"
    description="disabled为true选择器禁止，当options属性中包含disabled为true属性值也可以禁止"
    code="multipleCode"
  >
    <m-card>
      当前你的选择:{{
        selectValue.length === 0 ? "未选择" : selectValue.join(",")
      }}
    </m-card>
    <br />
    <m-select
      :options="options"
      size="small"
      v-model="selectValue"
      placeholder="我禁用了Java和go语言"
      multiple
    ></m-select>
    <br />
    <m-select
      :options="options"
      size="small"
      v-model="selectValue"
      placeholder="disabled为true"
      multiple
      disabled
    ></m-select>
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
// import { sizeCode } from "../doc";
import { ref } from "vue";
const options = [
  {
    label: "java",
    value: "java",
    disabled: true
  },
  {
    label: "js",
    value: "js"
  },
  {
    label: "php",
    value: "php"
  },
  {
    label: "go",
    value: "go",
    disabled: true
  },
  {
    label: "python",
    value: "python"
  },
  {
    label: "dart",
    value: "dart"
  },
  {
    label: "swift",
    value: "swift"
  }
];
const selectValue = ref<string[]>([]);
</script>
