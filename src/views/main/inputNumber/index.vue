<template>
  <div class="minput">
    <cpn-header-vue
      title="inputNumber"
      name="数字输入框"
      description="只能用于数字的输入，字母是不可能进来的"
    ></cpn-header-vue>
    <div class="layout">
      <size-vue></size-vue>
    </div>
  </div>
</template>

<script lang="ts" setup name="minput">
/*
 * @Author: bughou
 * @Date: 2022-05-07 16:15:05
 * @Description: 创建一个minput组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import sizeVue from "./cpn/size.vue";
</script>
