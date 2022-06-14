<template>
  <cpn-play-vue title="suffix" description="添加后缀文字" :code="suffixCode">
    <m-auto-complete
      :suffix="suffix"
      v-model="value"
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
import { suffixCode } from "../doc";
const suffix = ["@qq.com", "@google.com", "@163.com"];
const value = ref("");
const placeholder = "请输入";
</script>
