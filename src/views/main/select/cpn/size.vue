<template>
  <cpn-play-vue
    title="size"
    description="只有大小不一样，size支持mini，small，medium"
    :code="sizeCode"
  >
    <m-select
      :options="options"
      size="mini"
      v-model="selectValue1"
      placeholder="我是mini很小"
    ></m-select>
    <br />
    <m-select
      :options="options"
      size="small"
      v-model="selectValue2"
      placeholder="我是默认大小"
    ></m-select>
    <br />
    <m-select
      :options="options"
      size="medium"
      v-model="selectValue2"
      placeholder="我是大号"
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
import { sizeCode } from "../doc";
import { ref } from "vue";
const options = ["腾讯", "字节", "斗鱼", "北盛", "京东", "阿里", "B站"];
const selectValue1 = ref<string[]>([]);
const selectValue2 = ref<string[]>([]);
const selectValue3 = ref<string[]>([]);
</script>
