<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="48px"
    height="60px"
    viewBox="0 0 24 30"
    style="enable-background: new 0 0 50 50"
    xml:space="preserve"
  >
    <rect
      x="0"
      y="7.6416"
      width="4"
      height="14.7168"
      fill="#FF6700"
      opacity="0.2"
    >
      <animate
        attributeName="opacity"
        attributeType="XML"
        values="0.2; 1; .2"
        begin="0s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animate>
      <animate
        attributeName="height"
        attributeType="XML"
        values="10; 20; 10"
        begin="0s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animate>
      <animate
        attributeName="y"
        attributeType="XML"
        values="10; 5; 10"
        begin="0s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animate>
    </rect>
    <rect
      x="8"
      y="5.1416"
      width="4"
      height="19.7168"
      fill="#FF6700"
      opacity="0.2"
    >
      <animate
        attributeName="opacity"
        attributeType="XML"
        values="0.2; 1; .2"
        begin="0.15s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animate>
      <animate
        attributeName="height"
        attributeType="XML"
        values="10; 20; 10"
        begin="0.15s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animate>
      <animate
        attributeName="y"
        attributeType="XML"
        values="10; 5; 10"
        begin="0.15s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animate>
    </rect>
    <rect
      x="16"
      y="7.3584"
      width="4"
      height="15.2832"
      fill="#FF6700"
      opacity="0.2"
    >
      <animate
        attributeName="opacity"
        attributeType="XML"
        values="0.2; 1; .2"
        begin="0.3s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animate>
      <animate
        attributeName="height"
        attributeType="XML"
        values="10; 20; 10"
        begin="0.3s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animate>
      <animate
        attributeName="y"
        attributeType="XML"
        values="10; 5; 10"
        begin="0.3s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animate>
    </rect>
  </svg>
</template>

<script lang="ts" setup name="grow">
/*
 * @Author: bughou
 * @Date: 2022-05-04 19:37:34
 * @Description: 创建一个grow组件
 */
// 从下载的组件中导入函数
import { ref, reactive, defineEmits, defineExpose, defineProps } from "vue";
</script>
<style scoped lang="less">
.grow {
}
</style>
