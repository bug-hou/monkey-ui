<template>
  <div class="m-watermark" ref="watermarkRef">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="m-watermark">
/*
 * @Author: bughou
 * @Date: 2022-08-01 19:54:31
 * @Description: 创建一个m-watermark组件
 */
// 从下载的组件中导入函数
import {
  ref,
  reactive,
  defineEmits,
  defineExpose,
  defineProps,
  onMounted
} from "vue";

const props = withDefaults(
  defineProps<{
    fontSize: number;
    color: string;
    text: string;
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
  }>(),
  {}
);

const watermarkRef = ref<HTMLElement>();

function __canvasWM({
  container = document.body,
  width = 300,
  height = 200,
  textAlign = props.textAlign,
  textBaseline = props.textBaseline,
  font = "20px Microsoft Yahei",
  fillStyle = "rgba(184, 184, 184, 0.6)",
  content = "水印",
  rotate = 45,
  zIndex = 10000
} = {}) {
  const args = arguments[0];
  const canvas = document.createElement("canvas");

  canvas.setAttribute("width", String(width * 2));
  canvas.setAttribute("height", String(height * 2));
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.rotate((Math.PI / 180) * rotate);
  ctx.fillText(content, width / 2, height / 2);
  const base64Url = canvas.toDataURL();
  const __wm = container;

  const watermarkDiv = __wm || document.createElement("div");
  const styleStr = `
                  position:fixed;
                  top:0;
                  left:0;
                  bottom:0;
                  right:0;
                  width:100%;
                  height:100%;
                  z-index:${zIndex};
                  pointer-events:none;
                  background-repeat:repeat;
                  background-image:url('${base64Url}')`;

  watermarkDiv.setAttribute("style", styleStr);
  watermarkDiv.classList.add("__wm");

  if (!__wm) {
    container.insertBefore(watermarkDiv, container.firstChild);
  }

  if (typeof module != "undefined" && module.exports) {
    //CMD
    module.exports = __canvasWM;
  } else if (typeof define == "function" && define.amd) {
    // AMD
    define(function () {
      return __canvasWM;
    });
  } else {
    window.__canvasWM = __canvasWM;
  }
}

onMounted(() => {
  if (watermarkRef.value) {
    const height = getComputedStyle(watermarkRef.value).height;
    const width = getComputedStyle(watermarkRef.value).width;
  }
});
</script>
<style scoped lang="less">
.m-watermark {
  width: 100%;
  height: 100%;
}
</style>
