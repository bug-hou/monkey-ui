<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="processMetaData(width)"
    :height="processMetaData(height)"
    viewBox="0 0 50 50"
    style="enable-background: new 0 0 50 50"
    xml:space="preserve"
  >
    <path
      :fill="color"
      d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
      transform="rotate(275.098 25 25)"
    >
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        :dur="duration + 's'"
        repeatCount="indefinite"
      ></animateTransform>
    </path>
  </svg>
</template>

<script lang="ts" setup name="deep">
/*
 * @Author: bughou
 * @Date: 2022-05-04 19:33:43
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
  }>(),
  {
    ...configData
  }
);
function processMetaData(data: MetaData) {
  return typeof data === "string" ? data : data + "px";
}
</script>
