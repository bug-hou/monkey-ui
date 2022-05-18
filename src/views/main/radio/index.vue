<template>
  <div class="card">
    <cpn-header-vue
      title="radio"
      name="单选器"
      description="单选器只能选择一个，只能和mRadioGroup组件一起使用，使用v-model对值进行监听"
    >
    </cpn-header-vue>
    <div class="layout">
      <size-vue></size-vue>
      <disabled-vue></disabled-vue>
      <button-vue></button-vue>
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
const checks = ref("腾讯");
</script>
<style scoped lang="less"></style>
