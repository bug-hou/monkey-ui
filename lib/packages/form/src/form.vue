<template>
  <div class="m-form">
    <div class="m-form-header">
      <slot name="header"></slot>
    </div>
    <div class="m-form-body">
      <slot></slot>
    </div>
    <div class="m-form-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup name="m-form">
/*
 * @Author: bughou
 * @Date: 2022-08-09 16:31:31
 * @Description: 创建一个m-form组件
 */
// 从下载的组件中导入函数
import { ref, reactive, defineEmits, defineExpose, defineProps } from "vue";
</script>
<style scoped lang="less">
.m-form {
  padding: 10px;
  .m-form-body {
    // display: flex;
  }
}
</style>
