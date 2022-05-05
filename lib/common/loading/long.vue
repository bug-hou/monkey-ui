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
      d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
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

<script lang="ts" setup name="long">
/*
 * @Author: bughou
 * @Date: 2022-05-04 19:34:35
 * @Description: 创建一个long组件
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
    width: 50,
    height: 50,
    opacity: 0.2,
    duration: 0.5
  }
);
function processMetaData(data: MetaData) {
  return typeof data === "string" ? data : data + "px";
}
</script>
