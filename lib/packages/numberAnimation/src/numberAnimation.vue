<template>
  <div
    class="m-number-animation"
    :class="[
      showBackground && 'm-number-animation-background',
      bold && 'm-number-animation-bold'
    ]"
    ref="numberAnimationRef"
    :style="[
      { ['--m-number-animation-height']: Math.max(height, fontSize) + 'px' },
      { ['--m-number-animation-width']: width + 'px' },
      { ['--m-number-animation-gap']: gap + 'px' },
      { ['--m-number-animation-fontSize']: fontSize + 'px' },
      { ['--m-number-animation-background']: background },
      { ['--m-number-animation-color']: color }
    ]"
  >
    <slot name="prefix">
      {{ prefix }}
    </slot>
    <div v-if="effect === 'change'">
      <ul class="m-number-animation-scroll">
        <li v-for="(item, index) in String(displayedValue)">
          <p
            v-if="
              showSeparator &&
              (String(displayedValue).length - index) % 3 === 0 &&
              index !== 0
            "
            class="m-number-animation-separator"
          >
            {{ separator }}
          </p>
          <p>{{ item }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <ul class="m-number-animation-scroll">
        <li v-for="(item, index) in scrollValue" :key="index">
          <p
            v-if="
              showSeparator &&
              (scrollValue.length - index) % 3 === 0 &&
              index !== 0
            "
            class="m-number-animation-separator"
          >
            {{ separator }}
          </p>
          <p>
            <scroll-vue :duration="duration" :value="item"></scroll-vue>
          </p>
        </li>
      </ul>
    </div>
    <slot name="suffix">
      {{ suffix }}
    </slot>
  </div>
</template>

<script lang="ts" setup name="m-number-animation">
/*
 * @Author: bughou
 * @Date: 2022-05-29 17:12:38
 * @Description: 创建一个m-number-animation组件
 */
// 从下载的组件中导入函数
import { ref, defineProps, Ref, watch } from "vue";
import { useChange } from "../hooks/changeAnimation";
import scrollVue from "./scroll.vue";
const props = withDefaults(
  defineProps<{
    to: number;
    from: number;
    effect?: "scroll" | "change";
    active?: boolean;
    duration?: number;
    background?: string;
    height?: number;
    fontSize?: number;
    color?: string;
    showBackground?: boolean;
    gap?: number;
    width?: number;
    bold?: boolean;
    showSeparator?: boolean;
    separator?: string;
    prefix?: string;
    suffix?: string;
  }>(),
  {
    effect: "change",
    active: true,
    duration: 1000,
    height: 24,
    fontSize: 18,
    background: "#9995",
    color: "#333",
    showBackground: false,
    gap: 0,
    bold: false,
    separator: ","
  }
);
const { from, duration } = props;

const numberAnimationRef = ref<HTMLElement>();
let displayedValue: Ref<number> = ref(from);
let scrollValue = ref<number[]>(processScrollValue());
watch(
  () => [props.active, props.to],
  ([newActive, newTo]) => {
    if (newActive) {
      if (props.effect === "change") {
        useChange(from, newTo as number, duration, displayedValue);
      } else {
        if (String(newTo as number).length < scrollValue.value.length) {
          scrollValue.value.splice(0, String(newTo as number).length);
        }
        for (let i = 0; i < String(newTo as number).length; i++) {
          scrollValue.value[i] = +String(newTo as number).charAt(i);
        }
      }
    }
  },
  {
    immediate: true
  }
);
function processScrollValue() {
  return new Array(String(from).length)
    .fill(0)
    .map((_, index) => +String(from).charAt(index));
}
</script>
<style scoped lang="less">
.m-number-animation {
  display: flex;
  height: var(--m-number-animation-height);
  font-size: var(--m-number-animation-fontSize);
  line-height: var(--m-number-animation-height);
  overflow: hidden;
  .m-number-animation-scroll {
    display: inline-flex;
    overflow: hidden;
  }
  &.m-number-animation-background {
    p {
      background-color: var(--m-number-animation-background);
    }
  }
  p {
    display: inline-flex;
    overflow: hidden;
    border-radius: 5px;
    justify-content: center;
    text-align: center;
    margin-right: var(--m-number-animation-gap);
    width: var(--m-number-animation-width);
    height: var(--m-number-animation-height);
    color: var(--m-number-animation-color);
    &.m-number-animation-bold {
      font-weight: bold;
    }
    &.m-number-animation-separator {
      flex: 0;
    }
  }
  li:last-child {
    p {
      margin-right: 0;
    }
  }
}
</style>
