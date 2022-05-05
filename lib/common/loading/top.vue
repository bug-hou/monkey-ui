<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="processMetaData(width)"
    :height="processMetaData(height)"
    viewBox="0 0 24 24"
    style="enable-background: new 0 0 50 50"
    xml:space="preserve"
  >
    <rect
      x="0"
      y="0"
      width="4"
      height="7"
      :fill="color"
      transform="scale(1 1.94336)"
    >
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="scale"
        values="1,1; 1,3; 1,1"
        begin="0s"
        :dur="duration + 's'"
        repeatCount="indefinite"
      ></animateTransform>
    </rect>
    <rect
      x="10"
      y="0"
      width="4"
      height="7"
      :fill="color"
      transform="scale(1 2.72331)"
    >
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="scale"
        values="1,1; 1,3; 1,1"
        begin="0.2s"
        :dur="duration + 's'"
        repeatCount="indefinite"
      ></animateTransform>
    </rect>
    <rect
      x="20"
      y="0"
      width="4"
      height="7"
      :fill="color"
      transform="scale(1 1.38997)"
    >
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="scale"
        values="1,1; 1,3; 1,1"
        begin="0.4s"
        :dur="duration + 's'"
        repeatCount="indefinite"
      ></animateTransform>
    </rect>
  </svg>
</template>

<script lang="ts" setup name="top">
/*
 * @Author: bughou
 * @Date: 2022-05-04 19:35:11
 * @Description: 创建一个top组件
 */
// 从下载的组件中导入函数
import { withDefaults, defineProps } from "vue";
type MetaData = number | string;
const props = withDefaults(
  defineProps<{
    color?: string;
    width?: MetaData;
    height?: MetaData;
    duration?: number;
    opacity?: number;
  }>(),
  {
    color: "#0ff",
    width: 24,
    height: 24,
    opacity: 0.2,
    duration: 0.5
  }
);
function processMetaData(data: MetaData) {
  return typeof data === "string" ? data : data + "px";
}
</script>
