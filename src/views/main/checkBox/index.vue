<template>
  <div class="card">
    <cpn-header-vue
      title="divider"
      name="分隔线"
      description="将两个内容分隔开来，为什么就不能在一起了"
    >
    </cpn-header-vue>
    <div class="layout">
      <size-vue></size-vue>
      <disabled-vue></disabled-vue>
      <button-vue></button-vue>
      <max-vue></max-vue>
    </div>
  </div>
</template>

<script lang="ts" setup name="card">
/*
 * @Author: bughou
 * @Date: 2022-05-09 18:42:15
 * @Description: 创建一个card组件
 */
// 从下载的组件中导入函数
import { ref } from "vue";
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import sizeVue from "./cpn/size.vue";
import disabledVue from "./cpn/disabled.vue";
import buttonVue from "./cpn/button.vue";
import maxVue from "./cpn/max.vue";
</script>
<style scoped lang="less"></style>
