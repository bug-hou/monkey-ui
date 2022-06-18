<template>
  <label class="m-color">
    <input type="color" v-model="color" />
    <div
      class="m-color-show"
      :style="[{ color: computedColor(color) }, { backgroundColor: color }]"
    >
      {{ modeSelect(color, mode) }}
    </div>
  </label>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, ref } from "vue";
const props = withDefaults(
  defineProps<{
    color: string;
    mode?: "RGB" | "HEX" | "HSL";
  }>(),
  {
    color: "#00ffff",
    mode: "RGB"
  }
);

const color = ref(props.color);

function computedColor(color: string) {
  let answer = 1;
  if (color.startsWith("#")) {
    color = color.slice(1);
    for (let i = 0; i < 3; i++) {
      let colors: string;
      if (color.length == 6) {
        colors = color.slice(i * 2, (i + 1) * 2);
      } else {
        colors = color.slice(i, i + 1) + color.slice(i, i + 1);
      }
      answer += +parseInt(colors, 16);
    }
  }
  if (answer >= 450) {
    return "#000000";
  } else {
    return "#ffffff";
  }
}

var colorRgb = function (sColor: string) {
  sColor = sColor.toLowerCase();
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange: any[] = [];
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return "RGB(" + sColorChange.join(",") + ")";
  }
  return sColor;
};

function rgbToHsl(color: string) {
  let [r, g, b] = color
    .slice(4, -1)
    .split(",")
    .map((item) => +item);
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `hsl(${h.toFixed(2)},${s.toFixed(2)},${l.toFixed(2)})`;
}

function modeSelect(color: string, mode: "HEX" | "RGB" | "HSL") {
  if (mode === "HEX") {
    return color;
  }
  const colors = colorRgb(color);
  if (mode === "RGB") {
    return colors;
  }
  return rgbToHsl(colors);
}
</script>

<style lang="less" scoped>
.m-color {
  width: 200px;
  display: flex;
  position: relative;
  input {
    position: absolute;
    opacity: 0;
  }
  .m-color-show {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}
</style>
