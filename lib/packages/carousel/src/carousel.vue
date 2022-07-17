<template>
  <div
    class="m-carousel"
    @wheel.prevent="wheelHandle"
    :style="[
      {
        ['--carousel-dot-color']: dotColor
      },
      {
        ['--carousel-dot-bg-color']: dotBgColor
      },
      {
        ['--carousel-arrow-color']: arrowColor
      },
      {
        ['--carousel-arrow-bg-color']: arrowBgColor
      }
    ]"
  >
    <main
      class="m-carousel-main"
      :class="[mode === 'slider' && 'm-carousel-slide']"
      ref="carouselRef"
      @mousedown="downHandle"
      @mouseup="upHandle"
    >
      <slot></slot>
    </main>
    <ul
      class="m-carousel-dot"
      :class="['m-carousel-dot-' + dotPlacement, 'm-carousel-dot-' + dotStyle]"
      v-if="showDot"
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
        :class="mode === 'horization' && 'm-carousel-operate-rotate'"
        v-if="showArrow"
      >
        <m-icon name="m-toLeft"></m-icon>
      </div>
    </slot>
    <slot name="operateRight" :execHandle="rightClickHandle">
      <div
        class="m-carousel-operate m-carousel-operate-right"
        :class="mode === 'horization' && 'm-carousel-operate-rotate'"
        @click="rightClickHandle"
        v-if="showArrow"
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
import { ref, defineProps, onMounted, watch, provide } from "vue";
import { cssUnitConversion } from "../../../utils";

import { processProvides } from "../utils/provides";

import mIcon from "../../icon/src/icon.vue";

type Mode = "vertical" | "horization" | "scale" | "slider";

interface MouseWheel extends WheelEvent {
  wheelDelta: number;
}

const props = withDefaults(
  defineProps<{
    defaultIndex?: number;
    mode?: Mode;
    duration?: number;
    dotPlacement?: "left" | "right" | "top" | "bottom";
    dotStyle?: "round" | "line";
    dotColor?: string;
    dotBgColor?: string;
    autoplay?: boolean;
    delay?: number;
    customDotPosition?: [number | string, number | string];
    showDot?: boolean;
    showArrow?: boolean;
    arrowColor?: string;
    arrowBgColor?: string;
    attachment?: boolean;
    mosueWheel?: boolean;
  }>(),
  {
    defaultIndex: 0,
    duration: 1000,
    mode: "vertical",
    autoplay: false,
    dotPlacement: "bottom",
    delay: 4000,
    dotStyle: "round",
    showArrow: false,
    showDot: true,
    attachment: false,
    mosueWheel: false,
    dotBgColor: "rgba(255, 255, 255, 0.3)",
    dotColor: "#fff",
    arrowBgColor: "rgba(255, 255, 255, 0.3)",
    arrowColor: "#fff"
  }
);

const carouselRef = ref<HTMLElement>();

const currentIndex = ref(props.defaultIndex);

const direction = ref<"from" | "to">("from");

let timer: any;

let isChange: boolean = true;

const mouseInfo = {
  x: 0,
  y: 0,
  has: false
};

const len = ref(0);

const provideInfo = [
  ["currentIndex", currentIndex],
  ["direction", direction],
  ["duration", props.duration],
  ["mode", props.mode],
  ["attachment", props.attachment],
  ["itemClickHandle", dotClickHandle]
] as any;
processProvides(provideInfo);

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

function wheelHandle(event: MouseWheel) {
  if (props.mosueWheel) {
    if (event.wheelDelta > 0) {
      leftClickHandle();
    } else {
      rightClickHandle();
    }
  }
}

function changeIndex(opacity: "right" | "left" = "right", index?: number) {
  if (typeof index === "number") {
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

function downHandle(event: MouseEvent) {
  mouseInfo.has = true;
  mouseInfo.x = event.offsetX;
  mouseInfo.y = event.offsetY;
}

function upHandle(event: MouseEvent) {
  if (mouseInfo.has) {
    mouseInfo.has = false;
    const curX = event.offsetX;
    const curY = event.offsetY;
    if (props.mode === "horization" && Math.abs(curY - mouseInfo.y) >= 50) {
      if (curY > mouseInfo.y) {
        processClickHandle("left", "to");
      } else {
        processClickHandle("right", "from");
      }
    } else if (
      props.mode === "vertical" &&
      Math.abs(curX - mouseInfo.x) >= 50
    ) {
      if (curX > mouseInfo.x) {
        processClickHandle("left", "to");
      } else {
        processClickHandle("right", "from");
      }
    }
  }
}

onMounted(() => {
  len.value = carouselRef.value?.children.length ?? 0;
  timer = startInterval();
});
</script>
<style scoped lang="less">
.m-carousel {
  position: relative;
  height: 200px;
  width: 300px;
  overflow: hidden;
  .m-carousel-dot {
    position: absolute;
    display: flex;
    gap: 8px;
    transform: translate(-50%, -50%);
    &.m-carousel-dot-left {
      left: 2%;
      top: 50%;
      flex-direction: column;
      &.m-carousel-dot-line li {
        width: 5px;
        height: 10px;
        border-radius: 5px;
        &.m-carousel-li-active {
          height: 18px;
        }
      }
    }
    &.m-carousel-dot-right {
      left: 98%;
      top: 50%;
      flex-direction: column;
      &.m-carousel-dot-line li {
        width: 5px;
        height: 10px;
        border-radius: 5px;
        &.m-carousel-li-active {
          height: 18px;
        }
      }
    }
    &.m-carousel-dot-top {
      left: 50%;
      top: 10%;
      &.m-carousel-dot-line li {
        width: 10px;
        height: 5px;
        border-radius: 5px;
        &.m-carousel-li-active {
          width: 18px;
        }
      }
    }
    &.m-carousel-dot-bottom {
      left: 50%;
      top: 90%;
      &.m-carousel-dot-line li {
        width: 10px;
        height: 5px;
        border-radius: 5px;
        &.m-carousel-li-active {
          width: 18px;
        }
      }
    }

    &.m-carousel-dot-round li {
      width: 10px;
      height: 10px;
      border-radius: 5px;
    }
    li {
      cursor: pointer;
      transition: all 0.5s;
      background-color: var(--carousel-dot-bg-color);
      &.m-carousel-li-active {
        background-color: var(--carousel-dot-color);
      }
    }
  }
  .m-carousel-main {
    &.m-carousel-slide {
      display: flex;
      gap: 10px;
      justify-content: space-between;
    }
  }
  .m-carousel-operate {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    line-height: 30px;
    background: var(--carousel-arrow-bg-color);
    color: var(--carousel-arrow-color);
    cursor: pointer;
    border-radius: 10px;
    left: 3%;
    &.m-carousel-operate-rotate {
      transform: rotate(90deg);
    }
  }
  .m-carousel-operate-right {
    right: 3%;
    left: auto;
  }
}
</style>
