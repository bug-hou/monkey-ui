<!-- bgTooltip -->
<template>
  <div
    class="m-tooltip-contain"
    @mouseenter="enterHandle"
    @mouseleave="leaveHandle"
    @click="clickHandle"
    :style="[
      { ['--m-tooltip-columns']: +columns },
      { ['--m-tooltip-width']: width },
      { ['--m-tooltip-height']: height },
      { ['--m-tooltip-background']: background },
      { ['--m-tooltip-color']: color },
      { ['--m-tooltip-hover']: hoverColor }
    ]"
  >
    <slot></slot>
    <transition
      :name="
        direction === 'top'
          ? 'listPositionOpacity'
          : 'listPositionBottomOpacity'
      "
      :appear="true"
    >
      <div
        :class="[
          'm-tooltip',
          'm-tooltip-' + direction,
          arrow && 'm-tooltip-arrow',
          list.length === 1 && 'm-tooltip-text',
          width !== 'auto' && 'm-tooltip-width'
        ]"
        ref="tooltipRef"
        @mouseenter="tooltipEnterHandle"
        @mouseleave="tooltipLeaveHandle"
        v-show="(fatherShow || selfShow) && tooltipShow && showTooltip"
        :style="!keepAliveOnHover && { 'pointer-events': 'none' }"
      >
        <div class="m-tooltip-container">
          <div class="custom-vertical-scrollbar" ref="scrollBarRef">
            <div class="custom-vertical-indicator"></div>
          </div>
          <div class="m-tooltip-header">
            <slot name="header"> {{ header }}</slot>
          </div>
          <m-divider></m-divider>
          <template v-for="(item, index) in list" :key="index">
            <slot name="tooltip" :value="item">
              <p @click="itemClick(item, index)">{{ item }}</p>
            </slot>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { reactive, ref, withDefaults, defineProps, onMounted } from "vue";
import mDivider from "../../divider/src/divider.vue";

import { useScroll } from "../../../hooks";

const props = withDefaults(
  defineProps<{
    direction?: "top" | "bottom" | "left" | "right";
    width?: string;
    columns?: number;
    height?: string;
    arrow?: boolean;
    tooltipText?: string | string[];
    tooltipShow?: boolean;
    trigger?: "hover" | "click";
    effect?: "light" | "dark";
    delay?: number;
    duration?: number;
    keepAliveOnHover?: boolean;
    header?: string;
  }>(),
  {
    tooltipShow: true,
    columns: 1,
    arrow: true,
    direction: "top",
    trigger: "hover",
    width: "auto",
    height: "auto",
    effect: "light",
    delay: 0,
    duration: 0,
    keepAliveOnHover: true,
    tooltipText: ""
  }
);
const fatherShow = ref(false);
const selfShow = ref(false);
const list = reactive([]);
const showTooltip = ref(false);

const tooltipRef = ref<HTMLElement>();
const scrollBarRef = ref<HTMLElement>();

let bscroll: any;

const background = props.effect === "dark" ? "#262626" : "#fafbfc";
const color = props.effect === "dark" ? "#fff" : "#61666d";
const hoverColor = "#e3e5e7";

if (typeof props.tooltipText === "string") {
  list.push(props.tooltipText);
} else if (Array.isArray(props.tooltipText)) {
  list.splice(0, 0, ...props.tooltipText);
}

const tooltipEnterHandle = () => {
  bscroll.refresh();
  if (props.trigger === "hover") selfShow.value = true;
};
const tooltipLeaveHandle = () => {
  bscroll.refresh();
  if (props.trigger === "hover") selfShow.value = false;
};

const itemClick = (item, index) => {

  // emits("itemClick", item, index);
};
function enterHandle() {
  processShowTooltip("hover", true);
}
function leaveHandle() {
  processShowTooltip("hover", false);
}
function clickHandle() {
  processShowTooltip("click", !showTooltip.value);
}
function processShowTooltip(name: "hover" | "click", value: boolean) {
  if (props.trigger === name)
    setTimeout(
      () => {
        fatherShow.value = !fatherShow.value;
        showTooltip.value = value;
        bscroll.refresh();
      },
      value ? props.delay : props.duration
    );
}

onMounted(() => {
  bscroll = useScroll(tooltipRef.value, {
    scrollbar: {
      interactive: true,
      fade: true,
      customElements: [scrollBarRef.value]
    }
  });
});
</script>
<style scoped lang="less">
.m-tooltip-contain {
  display: inline-block;
  position: relative;
  .m-tooltip {
    z-index: 1000;
    position: absolute;
    transform: translateX(-50%);
    padding: 10px;
    left: 50%;
    // overflow: hidden;
    height: var(--m-tooltip-height);
    &.m-tooltip-arrow::before {
      content: "";
      position: absolute;
      top: calc(100% - 10px);
      left: 50%;
      transform: translate(-50%, -2px);
      border: 10px solid transparent;
      border-radius: 5px;
      border-top-color: var(--m-tooltip-background);
    }
    &.m-tooltip-text {
      .m-tooltip-container {
        p {
          padding: 0;
          &:hover {
            background-color: var(--m-tooltip-background);
          }
        }
      }
    }
    .m-tooltip-container {
      display: grid;
      grid-template-columns: repeat(
        var(--m-tooltip-columns),
        var(--m-tooltip-width)
      );
      grid-column-gap: 5px;
      border-radius: 8px;
      background: var(--m-tooltip-background);
      border: 1px solid var(--m-tooltip-background);
      color: var(--m-tooltip-color);
      padding: 5px;
      box-shadow: 0px 0px 5px 3px var(--shadow-color-tooltip);
      p {
        cursor: pointer;
        padding: 6px 5px;
        border-radius: 6px;
        white-space: nowrap;
        &:hover {
          background: var(--m-tooltip-hover);
        }
      }
    }
    &.m-tooltip-width {
      p {
        white-space: pre-wrap !important;
      }
    }
    .m-tooltip-header {
      white-space: nowrap;
      text-align: center;
      font-weight: bold;
      &:empty {
        display: none;
      }
      &:empty + div {
        display: none;
      }
    }
  }
  .m-tooltip-top {
    bottom: 100%;
    left: 50%;
    right: auto;
    top: auto;
  }
  .m-tooltip-bottom {
    top: 100%;
    left: 50%;
    right: auto;
    bottom: auto;
    &.m-tooltip-arrow::before {
      bottom: calc(100% - 10px);
      transform: translate(-50%, 2px);
      top: auto;
      left: 50%;
      border: 10px solid transparent;
      border-bottom-color: var(--m-tooltip-background);
    }
  }
  .m-tooltip-left {
    right: calc(100%);
    top: 50%;
    left: auto;
    bottom: auto;
    transform: translateY(-50%);
    &.m-tooltip-arrow::before {
      left: calc(100% - 10px);
      transform: translate(-2px, -50%);
      top: 50%;
      bottom: auto;
      right: auto;
      border: 10px solid transparent;
      border-left-color: var(--m-tooltip-background);
    }
  }
  .m-tooltip-right {
    left: calc(100%);
    top: 50%;
    right: auto;
    bottom: auto;
    transform: translateY(-50%);
    &.m-tooltip-arrow::before {
      right: calc(100% - 10px);
      transform: translate(2px, -50%);
      left: auto;
      top: 50%;
      bottom: auto;
      border: 10px solid transparent;
      border-right-color: var(--m-tooltip-background);
    }
  }
}

.custom-vertical-scrollbar {
  position: absolute;
  top: 50%;
  right: 0px;
  height: 100%;
  width: 7px;
  border-radius: 6px;
  transform: translateY(-50%) translateZ(0);
  background-color: white;
  .custom-vertical-indicator {
    width: 100%;
    height: 30px;
    border-radius: 6px;
    background-color: rgb(200, 200, 200, 0.3);
  }
}
</style>
