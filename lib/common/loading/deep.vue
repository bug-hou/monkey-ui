<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="processMetaData(width)"
    :height="processMetaData(height)"
    viewBox="0 0 24 24"
    style="enable-background: new 0 0 24 24"
    xml:space="preserve"
  >
    <rect
      x="0"
      y="0"
      width="4"
      height="10"
      :fill="color"
      transform="translate(0 9.4336)"
    >
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="translate"
        values="0 0; 0 20; 0 0"
        begin="0"
        :dur="duration + 's'"
        repeatCount="indefinite"
      ></animateTransform>
    </rect>
    <rect
      x="10"
      y="0"
      width="4"
      height="10"
      :fill="color"
      transform="translate(0 17.2331)"
    >
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="translate"
        values="0 0; 0 20; 0 0"
        begin="0.2s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animateTransform>
    </rect>
    <rect
      x="20"
      y="0"
      width="4"
      height="10"
      :fill="color"
      transform="translate(0 3.89973)"
    >
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="translate"
        values="0 0; 0 20; 0 0"
        begin="0.4s"
        dur="0.6s"
        repeatCount="indefinite"
      ></animateTransform>
    </rect>
  </svg>
</template>

<script lang="ts" setup name="deep">
/*
 * @Author: bughou
 * @Date: 2022-05-04 19:35:51
 * @Description: 创建一个deep组件
 */
// 从下载的组件中导入函数
import { withDefaults, defineProps } from "vue";
import configData from "./config";
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
    ...configData
  }
);
function processMetaData(data: MetaData) {
  return typeof data === "string" ? data : data + "px";
}
</script>
