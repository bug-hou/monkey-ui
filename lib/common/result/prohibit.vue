<template>
  <svg
    t="1654502688124"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="3069"
    :width="width"
    :height="height"
  >
    <path
      d="M763.776 968.96H261.504C147.456 968.96 55.04 876.544 55.04 762.496V260.224C55.04 146.176 147.456 53.76 261.504 53.76h502.272C877.824 53.76 970.24 146.176 970.24 260.224v502.272c0 114.048-92.416 206.464-206.464 206.464z"
      :fill="color"
      p-id="3070"
    ></path>
    <path
      d="M512.64 252.8c-142.592 0-258.56 115.968-258.56 258.56s115.968 258.56 258.56 258.56 258.56-115.968 258.56-258.56-115.968-258.56-258.56-258.56z m-194.688 258.56c0-42.24 13.568-81.152 36.48-113.024l271.36 271.36c-31.872 22.912-70.912 36.48-113.024 36.48-107.52 0-194.816-87.424-194.816-194.816z m352.896 113.152l-271.36-271.36c31.872-22.912 70.912-36.48 113.024-36.48 107.392 0 194.688 87.424 194.688 194.688 0.128 42.24-13.44 81.152-36.352 113.152z"
      fill="#FFFFFF"
      p-id="3071"
    ></path>
  </svg>
</template>

<script lang="ts" setup name="prohibit">
/*
 * @Author: bughou
 * @Date: 2022-06-06 16:04:37
 * @Description: 创建一个prohibit组件
 */
// 从下载的组件中导入函数
import { withDefaults, defineProps } from "vue";

const props = withDefaults(
  defineProps<{
    color?: string;
    width?: number;
    height?: number;
  }>(),
  {
    color: "#FF4D3C",
    width: 128,
    height: 128
  }
);
</script>
