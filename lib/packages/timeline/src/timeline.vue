<!-- bgTimeline -->
<template>
  <div
    class="mTimeline"
    :class="horizontal && 'mTimelineHorizontal'"
    :style="{ ['width']: processWidth(width) }"
  >
    <header v-if="showHeader">
      <slot name="title"> </slot>
    </header>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { provide, withDefaults, defineProps } from "vue";

import config from "../config";

const props = withDefaults(
  defineProps<{
    showHeader?: boolean;
    backgroundLine?: string;
    background?: string;
    isShadow?: boolean;
    isBorder?: boolean;
    type?: "success" | "info" | "warning" | "primary" | "error" | "default";
    width?: number | string;
    horizontal?: boolean;
  }>(),
  {
    showHeader: true,
    type: "default",
    width: 500,
    horizontal: false
  }
);
provide(config.TYPE, props.type);
provide(config.BACKGROUND, props.background);
provide(config.BACKGROUNDLINE, props.backgroundLine);
provide(config.ISBORDER, props.isBorder);
provide(config.ISSHADOW, props.isShadow);
provide(config.HORIZONTAL, props.horizontal);

function processWidth(width: number | string) {
  if (isNaN(Number(width))) {
    return width;
  } else {
    return width + "px";
  }
}
</script>
<style lang="less">
.mTimeline {
  header {
    &:empty {
      display: none;
    }
    width: 100%;
    height: 30px;
    font-size: 18px;
    line-height: 30px;
    text-align: center;
  }
  .mTimelineItem:last-of-type {
    .m-timeline-after {
      display: none;
    }
  }
  &.mTimelineHorizontal {
    display: flex;
    padding-top: 10px;
    .mTimelineItem:last-of-type {
      .m-timeline-after {
        display: block;
      }
    }
  }
}
</style>
