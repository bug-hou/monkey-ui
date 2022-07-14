<template>
  <div class="m-carousel">
    <main class="m-carousel-main" ref="carouselRef">
      <slot></slot>
    </main>
    <ul
      class="m-carousel-dot"
      :class="'m-carousel-dot-' + dotPlacement"
      :style="[
        {
          left: customDotPosition && cssUnitConversion(customDotPosition[0])
        },
        { top: customDotPosition && cssUnitConversion(customDotPosition[1]) }
      ]"
    >
      <slot name="dot">
        <li v-for="item in len" :key="item" @click="dotClickHandle(item)"></li>
      </slot>
    </ul>
    <slot name="operateLeft">
      <div class="m-carousel-operate m-carousel-operate-left">
        <m-icon name="m-toLeft"></m-icon>
      </div>
    </slot>
    <slot name="operateRight">
      <div class="m-carousel-operate m-carousel-operate-right">
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
    direction?: "vertical" | "horization";
    dotPlacement?: "left" | "right" | "top" | "bottom";
    dotStyle?: "round" | "line";
    autoplay?: boolean;
    delay?: number;
    customDotPosition?: [number | string, number | string];
  }>(),
  {
    defaultIndex: 1,
    duration: 3000,
    direction: "vertical",
    mode: "slider",
    autoplay: true,
    delay: 4000
  }
);

const carouselRef = ref<HTMLElement>();

const currentIndex = ref(props.defaultIndex);

const direction = ref<"from" | "to">("from");

const carouselInfo = reactive({});

provide("currentIndex", currentIndex);
provide("direction", direction);

const len = ref(0);

function processDotChange() {}

function dotClickHandle(item: number) {}

onMounted(() => {
  len.value = carouselRef.value?.children.length ?? 0;

  const timer = setInterval(() => {
    currentIndex.value++;
    if (currentIndex.value === len.value) {
      currentIndex.value = 0;
    }
  }, props.delay);

  watch(currentIndex, (newValue, oldValue) => {
    if (oldValue === len.value - 1) {
      direction.value = "to";
    } else {
      const diff = unref(newValue) - unref(oldValue);
      if (diff > 0) {
        direction.value = "to";
      } else {
        direction.value = "from";
      }
    }
  });
});
</script>
<style scoped lang="less">
.m-carousel {
  width: 300px;
  height: 200px;
  position: relative;
  overflow: hidden;
  .m-carousel-dot {
    position: absolute;
    display: flex;
    gap: 10px;
    transform: translate(-50%, -50%);
    &.m-carousel-dot-left {
      left: 15%;
      top: 50%;
    }
    &.m-carousel-dot-right {
      right: 15%;
      top: 50%;
    }
    &.m-carousel-dot-top {
      right: 50%;
      top: 15%;
    }
    &.m-carousel-dot-bottom {
      right: 50%;
      bottom: 15%;
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
    align-item: center;
    font-size: 24px;
    background: #6666;
    color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
    &:hover{
      &::before{
        content:"";
        position:absolute;
      }
    }
  }
  .m-carousel-operate-right {
    right: 0%;
  }
}
</style>
