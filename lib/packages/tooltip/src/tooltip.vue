<!-- bgTooltip -->
<template>
  <div class="m-tooltip-contain">
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
          'mTooltip',
          'm-tooltip-' + direction,
          arrow && 'm-tooltip-arrow'
        ]"
        ref="tooltip"
        @mouseout="leave"
        @mouseover="enter"
        v-show="(fatherShow || selfShow) && tooltipShow"
      >
        <div
          class="m-tooltip-container"
          :style="{ ['--m-tooltip-columns']: +columns }"
        >
          <template v-for="(item, index) in list" :key="index">
            <slot name="item" :item="item">
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
import { onMounted, reactive, ref, withDefaults, defineProps } from "vue";

const props = withDefaults(
  defineProps<{
    direction?: "top" | "bottom" | "left" | "right";
    width?: string;
    columns?: number;
    height?: string;
    arrow?: boolean;
    content: string | string[];
    tooltipShow?: boolean;
  }>(),
  {
    tooltipShow: true,
    columns: 1,
    arrow: true,
    direction: "bottom"
  }
);
const tooltip = ref();
const fatherShow = ref(false);
const selfShow = ref(false);
const list = reactive([]);
if (typeof props.content === "string") {
  list.push(props.content);
} else if (Array.isArray(props.content)) {
  list.splice(0, 0, ...props.content);
}
onMounted(() => {
  const parent = tooltip.value.parentElement;
  parent.addEventListener("mouseenter", () => {
    fatherShow.value = true;
  });
  parent.addEventListener("mouseleave", () => {
    fatherShow.value = false;
  });
});
const enter = () => {
  selfShow.value = true;
};
const leave = () => {
  selfShow.value = false;
};
const itemClick = (item, index) => {
  // emits("itemClick", item, index);
};
</script>
<style scoped lang="less">
.m-tooltip-contain {
  display: inline-block;
  position: relative;
  .mTooltip {
    z-index: 1000;
    position: absolute;
    transform: translateX(-50%);
    padding: 10px;
    left: 50%;
    &.m-tooltip-arrow::before {
      content: "";
      position: absolute;
      top: calc(100% - 10px);
      left: 50%;
      transform: translate(-50%, -2px);
      border: 10px solid transparent;
      border-radius: 5px;
      border-top-color: var(--border-color-tooltip);
    }
    .m-tooltip-container {
      display: grid;
      grid-template-columns: repeat(var(--m-tooltip-columns), auto);
      grid-column-gap: 5px;
      border-radius: 8px;
      background: var(--back-color-tooltip);
      border: 1px solid var(--border-color-tooltip);
      color: var(--font-color-tooltip);
      padding: 5px;
      box-shadow: 0px 0px 5px 3px var(--shadow-color-tooltip);
      p {
        cursor: pointer;
        padding: 6px 5px;
        border-radius: 6px;
        white-space: nowrap;
        &:hover {
          background: var(--back-color-hover-tooltip);
        }
      }
    }
  }
  .m-tooltip-top {
    bottom: calc(100%);
    left: 50%;
    right: auto;
    top: auto;
  }
  .m-tooltip-bottom {
    top: calc(100%);
    left: 50%;
    right: auto;
    bottom: auto;
    &.arrow::before {
      bottom: calc(100% - 10px);
      transform: translate(-50%, 2px);
      top: auto;
      left: 50%;
      border: 10px solid transparent;
      border-bottom-color: var(--border-color-tooltip);
    }
  }
  .m-tooltip-left {
    right: calc(100%);
    top: 50%;
    left: auto;
    bottom: auto;
    transform: translateY(-50%);
    &.arrow::before {
      left: calc(100% - 10px);
      transform: translate(-2px, -50%);
      top: 50%;
      bottom: auto;
      right: auto;
      border: 10px solid transparent;
      border-left-color: var(--border-color-tooltip);
    }
  }
  .m-tooltip-right {
    left: calc(100%);
    top: 50%;
    right: auto;
    bottom: auto;
    transform: translateY(-50%);
    &.arrow::before {
      right: calc(100% - 10px);
      transform: translate(2px, -50%);
      left: auto;
      top: 50%;
      bottom: auto;
      border: 10px solid transparent;
      border-right-color: var(--border-color-tooltip);
    }
  }
}
</style>
