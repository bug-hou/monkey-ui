<template>
  <div
    class="m-carousel"
    @mouseenter="cancelTimeEnterHandle"
    @mouseleave="recoverTimeEnterHandle"
  >
    <main class="m-carousel-main" ref="carouselRef">
      <slot></slot>
    </main>
    <ul
      class="m-carousel-dot"
      :class="['m-carousel-dot-' + dotPlacement, 'm-carousel-dot-' + dotStyle]"
      :style="[
        {
          left: customDotPosition && cssUnitConversion(customDotPosition[0])
        },
        { top: customDotPosition && cssUnitConversion(customDotPosition[1]) }
      ]"
    >
      <slot name="dot">
        <li
          v-for="item in len"
          :key="item"
          @click="dotClickHandle(item - 1)"
          :class="[currentIndex + 1 == item && 'm-carousel-li-active']"
        ></li>
      </slot>
    </ul>
    <slot name="operateLeft" :execHandle="leftClickHandle">
      <div
        class="m-carousel-operate m-carousel-operate-left"
        @click="leftClickHandle"
      >
        <m-icon name="m-toLeft"></m-icon>
      </div>
    </slot>
    <slot name="operateRight" :execHandle="rightClickHandle">
      <div
        class="m-carousel-operate m-carousel-operate-right"
        @click="rightClickHandle"
      >
        <m-icon name="m-toRight"></m-icon>
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup name="carousel">
/*
 * @Author: bughou
 * @Date: 2022-07-11 15:55:48
 * @Description: 创建一个carousel组件
 */
// 从下载的组件中导入函数
import {
  ref,
  defineProps,
  provide,
  onMounted,
  unref,
  reactive,
  watch
} from "vue";
import { cssUnitConversion } from "../../../utils";

import mIcon from "../../icon/src/icon.vue";

type Mode = "slider";
const props = withDefaults(
  defineProps<{
    defaultIndex?: number;
    mode?: Mode;
    duration?: number;
    dotPlacement?: "left" | "right" | "top" | "bottom";
    dotStyle?: "round" | "line";
    autoplay?: boolean;
    delay?: number;
    customDotPosition?: [number | string, number | string];
  }>(),
  {
    defaultIndex: 1,
    duration: 1000,
    mode: "slider",
    autoplay: true,
    dotPlacement: "top",
    delay: 4000,
    dotStyle: "round"
  }
);

const carouselRef = ref<HTMLElement>();

const currentIndex = ref(props.defaultIndex);

const direction = ref<"from" | "to">("from");

let timer: any;

let isChange: boolean = true;

const carouselInfo = reactive({});

provide("currentIndex", currentIndex);
provide("direction", direction);
provide("duration", props.duration);

const len = ref(0);

function processDotChange() {}

function dotClickHandle(index: number) {
  if (index > currentIndex.value) {
    processClickHandle("right", "from", index);
  } else {
    processClickHandle("left", "to", index);
  }
}

function leftClickHandle() {
  processClickHandle("left", "to");
}

function rightClickHandle() {
  processClickHandle("right", "from");
}
function processClickHandle(
  button: "right" | "left",
  directive: "from" | "to",
  index?: number
) {
  if (isChange) {
    isChange = false;
    direction.value = directive;
    changeIndex(button, index);
    setTimeout(() => {
      isChange = true;
    }, props.duration);
  }
}

function cancelTimeEnterHandle() {
  if (timer) {
    clearInterval(timer);
  }
}

function recoverTimeEnterHandle() {
  timer = startInterval();
}

function changeIndex(opacity: "right" | "left" = "right", index?: number) {
  if (index) {
    currentIndex.value = index;
  } else {
    if (opacity === "right") {
      currentIndex.value++;
      if (currentIndex.value === len.value) {
        currentIndex.value = 0;
      }
    } else {
      currentIndex.value--;
      if (currentIndex.value === -1) {
        currentIndex.value = len.value - 1;
      }
    }
  }
}

function startInterval() {
  let timer: any;
  if (props.autoplay) {
    timer = setInterval(() => {
      processClickHandle("right", "from");
    }, props.delay);
  }
  return timer;
}

onMounted(() => {
  len.value = carouselRef.value?.children.length ?? 0;
  timer = startInterval();
});
</script>
<style scoped lang="less">
@bgColor: #0009;
@color: #fff;
.m-carousel {
  width: 300px;
  height: 200px;
  position: relative;
  overflow: hidden;
  .m-carousel-dot {
    position: absolute;
    display: flex;
    gap: 8px;
    transform: translate(-50%, -50%);
    &.m-carousel-dot-left {
      left: 10%;
      top: 50%;
    }
    &.m-carousel-dot-right {
      left: 90%;
      top: 50%;
    }
    &.m-carousel-dot-top {
      left: 50%;
      top: 10%;
    }
    &.m-carousel-dot-bottom {
      left: 50%;
      top: 90%;
    }
    &.m-carousel-dot-line li {
      width: 16px;
      height: 5px;
      border-radius: 5px;
    }
    &.m-carousel-dot-round li {
      width: 10px;
      height: 10px;
      border-radius: 5px;
    }
    li {
      cursor: pointer;
      background-color: @bgColor;
      &.m-carousel-li-active {
        background-color: @color;
      }
    }
  }
  .m-carousel-main {
    width: 100%;
    height: 100%;
  }
  .m-carousel-operate {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    background: @bgColor;
    color: @color;
    cursor: pointer;
    border-radius: 10px;
    &:hover {
      &::before {
        content: "";
        position: absolute;
      }
    }
  }
  .m-carousel-operate-right {
    right: 0%;
  }
}
</style>
