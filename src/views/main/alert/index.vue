<template>
  <div class="avatar">
    <cpn-header-vue
      title="autoComplete"
      name="自动填充"
      description="可以尽量让你少些一点字"
    >
    </cpn-header-vue>
    <m-alert> 我是一个警告 </m-alert>
    <br />
    <m-alert>
      <template #title> 这是一个警告 </template>
    </m-alert>
    <div class="layout"></div>
  </div>
</template>

<script lang="ts" setup name="avatar">
/*
 * @Author: bughou
 * @Date: 2022-05-09 15:38:44
 * @Description: 创建一个avatar组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
</script>
