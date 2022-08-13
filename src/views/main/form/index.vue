<template>
  <div class="gradient">
    <cpn-header-vue
      title="form"
      name="表单"
      description="让你觉得表单原来如此简单"
    >
    </cpn-header-vue>
    <div class="layout">
      <base-vue></base-vue>
      <disabled-vue></disabled-vue>
      <form-vue></form-vue>
    </div>
  </div>
</template>

<script lang="ts" setup name="gradient">
/*
 * @Author: bughou
 * @Date: 2022-05-09 18:42:15
 * @Description: 创建一个gradient组件
 */
// 从下载的组件中导入函数
import { reactive, ref, watch } from "vue";
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import baseVue from "./cpn/base.vue";
import disabledVue from "./cpn/disabled.vue";
import formVue from "./cpn/form.vue";
</script>
<style scoped lang="less"></style>
