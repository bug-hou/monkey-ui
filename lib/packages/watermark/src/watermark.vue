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
import { ref, defineProps, onMounted, watch } from "vue";

const props = withDefaults(
  defineProps<{
    fontSize?: number;
    color?: string;
    content?: string;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
    fontFamily?: string;
    rotate?: number;
    img?: HTMLImageElement;
    textInterval?: number;
    imgWidth?: number;
    imgHeight?: number;
    visible?: boolean;
  }>(),
  {
    content: "商业机密",
    textAlign: "center",
    textBaseline: "middle",
    fontSize: 18,
    fontFamily: "Microsoft Yahei",
    color: "rgba(184, 184, 184, 0.6)",
    rotate: 45,
    textInterval: 1.5,
    visible: true
  }
);

const watermarkRef = ref<HTMLElement>();

const watermarkTestRef = ref<HTMLElement>();

function __canvasWM(
  width: number,
  {
    textAlign = props.textAlign,
    textBaseline = props.textBaseline,
    font = `${props.fontSize}px ${props.fontFamily}`,
    fillStyle = props.color,
    content = props.content,
    rotate = props.rotate,
    img = null as HTMLImageElement | null
  } = {}
) {
  const canvas = document.createElement("canvas");

  canvas.setAttribute("width", String(width));
  canvas.setAttribute("height", String(width));
  canvas.style.transform = `rotate(30deg);`;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  ctx.translate(width / 2, width / 2);

  if (img) {
    console.log(img )
    ctx.drawImage(img as any, 0, 0);
  }
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.rotate((Math.PI / 180) * rotate);
  ctx.fillText(content, 0, 0);
  const base64Url = canvas.toDataURL();

  watch(
    () => props.visible,
    (newValue) => {
      if (watermarkRef.value) {
        if (!newValue) {
          watermarkRef.value.style.backgroundImage = ``;
          return;
        }
        watermarkRef.value.style.backgroundImage = `url(${base64Url})`;
      }
    },
    {
      immediate: true
    }
  );
}

onMounted(() => {
  if (watermarkTestRef.value) {
    const { img, imgWidth, textInterval } = props;
    const width =
      parseInt(getComputedStyle(watermarkTestRef.value).width) * textInterval;
    if (img) {
      __canvasWM(imgWidth ?? img.width + width, { img });
      return;
    }
    __canvasWM(width);
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
  }
}
</style>
