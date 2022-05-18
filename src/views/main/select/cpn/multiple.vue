<template>
  <cpn-play-vue
    title="multiple"
    description="multiple为true我可以多选"
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
      placeholder="multiple为true"
      multiple
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
const options = ["腾讯", "字节", "斗鱼", "北盛", "京东", "阿里", "B站"];
const selectValue = ref<string[]>([]);
</script>

