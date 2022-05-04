<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="24px"
    height="30px"
    viewBox="0 0 24 30"
    style="enable-background: new 0 0 50 50"
    xml:space="preserve"
  >
    <rect x="0" y="9.22656" width="4" height="12.5469" fill="#FF6700">
      <animate
        attributeName="height"
        attributeType="XML"
        values="5;21;5"
        begin="0s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animate>
      <animate
        attributeName="y"
        attributeType="XML"
        values="13; 5; 13"
        begin="0s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animate>
    </rect>
    <rect x="10" y="5.22656" width="4" height="20.5469" fill="#FF6700">
      <animate
        attributeName="height"
        attributeType="XML"
        values="5;21;5"
        begin="0.15s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animate>
      <animate
        attributeName="y"
        attributeType="XML"
        values="13; 5; 13"
        begin="0.15s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animate>
    </rect>
    <rect x="20" y="8.77344" width="4" height="13.4531" fill="#FF6700">
      <animate
        attributeName="height"
        attributeType="XML"
        values="5;21;5"
        begin="0.3s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animate>
      <animate
        attributeName="y"
        attributeType="XML"
        values="13; 5; 13"
        begin="0.3s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animate>
    </rect>
  </svg>
</template>

<script lang="ts" setup name="slow">
/*
 * @Author: bughou
 * @Date: 2022-05-04 19:36:55
 * @Description: 创建一个slow组件
 */
// 从下载的组件中导入函数
import { ref, reactive, defineEmits, defineExpose, defineProps } from "vue";
</script>
<style scoped lang="less">
.slow {
}
</style>
