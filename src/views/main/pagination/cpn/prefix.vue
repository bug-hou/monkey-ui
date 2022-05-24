<template>
  <cpn-play-vue
    title="prefix和Suffix和Lable"
    description="添加前缀和后缀，或者将prefix和suffix设置为true，通过插槽自定义样式，label给页码添加内容"
    :code="sizeCode"
  >
    <m-pagination
      :count="100"
      :defaultPageSize="10"
      v-model="page"
      useBack
      skip
      prefix="选择页面"
      suffix="进行输入跳转"
    >
    </m-pagination>
    <br />
    <m-pagination
      :count="100"
      :defaultPageSize="10"
      useBack
      v-model="page"
      skip
      label="M-"
    ></m-pagination>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="baseVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import { ref } from "vue";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { sizeCode } from "../doc";
const page = ref(1);
</script>
<style lang="less" scoped>
p {
  width: 20px;
  display: inline-block;
}
</style>
