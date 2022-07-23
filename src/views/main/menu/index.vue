<template>
  <div class="minput">
    <cpn-header-vue
      title="input"
      name="输入框"
      description="用来做文字的输入"
    ></cpn-header-vue>
    <div class="layout">
      <base-vue></base-vue>
      <icon-vue></icon-vue>
      <path-vue></path-vue>
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
import baseVue from "./cpn/base.vue";
import iconVue from "./cpn/icon.vue";
import pathVue from "./cpn/path.vue";
</script>
