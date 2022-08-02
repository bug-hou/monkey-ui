<template>
  <div class="m-watermark">
    <div class="m-watermark-canvas" ref="watermarkRef"></div>
    <div class="m-watermark-test" ref="watermarkTestRef">{{ content }}</div>
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
    fontSize?: number;
    color?: string;
    content?: string;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
    fontFamily?: string;
  }>(),
  {
    content: "继续努力进大厂是我唯一的梦想",
    textAlign: "left",
    textBaseline: "top",
    fontSize: 18,
    fontFamily: "Microsoft Yahei"
  }
);

const watermarkRef = ref<HTMLElement>();

const watermarkTestRef = ref<HTMLElement>();

function __canvasWM({
  width = 30,
  textAlign = props.textAlign,
  textBaseline = props.textBaseline,
  font = `${props.fontSize}px ${props.fontFamily}`,
  fillStyle = "rgba(184, 184, 184, 0.6)",
  content = props.content,
  rotate = 30
} = {}) {
  const canvas = document.createElement("canvas");

  canvas.setAttribute("width", String(width));
  canvas.setAttribute("height", String(width));
  canvas.style.transform = `rotate(30deg);`;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.rotate((Math.PI / 180) * rotate);
  ctx.fillText(content, 0, 0);
  const base64Url = canvas.toDataURL();

  if (watermarkRef.value) {
    watermarkRef.value.style.backgroundImage = `url(${base64Url})`;
  }
}

function calcNumberOfString(str: string) {
  const reg = /[\u4E00-\u9FA5]/;

  const len = str.length;

  let count = len / 2;

  for (let i = 0; i < len; i++) {
    const s = str[i];
    if (reg.test(s)) {
      count += 1;
    }
  }

  return count;
}

onMounted(() => {
  if (watermarkTestRef.value) {
    const width = parseInt(getComputedStyle(watermarkTestRef.value).width);
    __canvasWM({ width });
  }
});
</script>
<style scoped lang="less">
.m-watermark {
  width: 100%;
  height: 100%;
  position: relative;
  .m-watermark-test {
    display: inline-block;
    opacity: 0;
    position: absolute;
    z-index: -100;
  }
  .m-watermark-canvas {
    position: absolute;
    background-repeat: repeat;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-repeat: repeat;
    z-index: 10;
    // background-size: 200px;
    // background-position: 96px 64px, -20px -10px;
  }
}
</style>
