<template>
  <cpn-play-vue title="prefix" description="添加前缀文字" :code="prefixCode">
    <m-auto-complete
      :prefix="prefix"
      v-model="value"
      :max="11"
      :placeholder="placeholder"
    ></m-auto-complete>
    <br />
    <br />
    <div>
      <m-button>{{ value ? value : placeholder }}</m-button>
    </div>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="size">
/*
 * @Author: bughou
 * @Date: 2022-05-09 16:07:00
 * @Description: 创建一个size组件
 */
// 从下载的组件中导入函数
import { ref } from "vue";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { prefixCode } from "../doc";
const prefix = ["+86-", "+83-", "+90-"];
const value = ref("");
const placeholder = "请输入";
</script>
