<!-- bgTimelineItem -->
<template>
  <div
    class="mTimelineItem"
    :class="horizontal && 'mTimelineItemHorizontal'"
    :style="[
      { ['--m-timeline-back']: background },
      { ['--m-timeline-back-line']: backgroundLine },
      { ['--m-timeline-line-style']: lineStyle }
    ]"
  >
    <div class="m-timeline-before">
      <slot name="icon">
        <p></p>
      </slot>
    </div>
    <p class="m-timeline-after"></p>
    <div class="m-timeline-item-main">
      <p class="m-timeline-title">{{ title }}</p>
      <div
        :class="[
          isShadow && 'm-timeline-shadow',
          isBorder && 'm-timeline-border',
          'm-timeline-item-contain'
        ]"
      >
        <slot name="main">
          <p class="m-timeline-content">
            <slot> {{ content }}</slot>
          </p>
        </slot>
        <p class="m-timeline-time">{{ timestamp }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { withDefaults, defineProps } from "vue";
import { useInject } from "../../../hooks";
import { LightTheme } from "../../../common/style";
import config from "../config";
import { getLightColor } from "../../../utils";

// 自定义方法引入
const props = withDefaults(
  defineProps<{
    backgroundLine?: string;
    background?: string;
    isShadow?: boolean;
    isBorder?: boolean;
    type?: "success" | "info" | "warning" | "primary" | "error" | "default";
    iconName?: string;
    timestamp?: string;
    content?: string;
    title: string | number;
    lineStyle: "solid" | "dashed" | "dotted";
  }>(),
  {
    lineStyle: "solid",
    isBorder: undefined,
    isShadow: undefined
  }
);

const type = useInject(props.type, config.TYPE, "default");
const colors = LightTheme[type];
const background = useInject(props.background, config.BACKGROUND, colors);
const backgroundLine = useInject(
  props.backgroundLine,
  config.BACKGROUNDLINE,
  getLightColor(colors, 0.7)
);
const isBorder = useInject(props.isBorder, config.ISBORDER, false);
const isShadow = useInject(props.isShadow, config.ISSHADOW, false);

const horizontal = useInject(undefined, config.HORIZONTAL, false);
</script>
<style scoped lang="less">
.mTimelineItem {
  position: relative;
  width: 100%;
  padding-left: 20px;
  min-height: 40px;
  .m-timeline-item-main {
    padding: 4px 0 0 10px;
    .m-timeline-title {
      font-size: 16px;
      font-weight: bold;
      color: rgb(31, 34, 37);
    }
  }
  .m-timeline-time {
    color: var(--font-color-timeline-time);
    width: 100%;
    font-size: 12px;
    font-weight: 500;
  }
  .m-timeline-content {
    font-size: 14px;
    background: var(--back-color-timeline-content);
    transition: all 0.5s;
    color: var(--font-color-timeline-time-content);
    cursor: pointer;
    border-radius: 6px;
  }
  .m-timeline-shadow {
    box-shadow: 0 2px 12px var(--shadow-color-timeline);
  }
  .m-timeline-border {
    border: 1px solid var(--border-color-timeline);
  }
  .m-timeline-before,
  .m-timeline-after {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 10px;
    transform: translateX(-50%);
    background: var(--back-color-timeline);
    color: white;
    font-size: 14px;
  }
  .m-timeline-before {
    top: 6px;
    width: 14px;
    height: 14px;
    color: var(--m-timeline-back);
    font-size: 16px;
    p {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      border: 2px solid;
    }
    z-index: 100;
  }
  .m-timeline-after {
    top: 14px;
    border-left: 2px var(--m-timeline-line-style) var(--m-timeline-back-line);
    height: calc(100% - 8px);
  }

  &.mTimelineItemHorizontal {
    min-width: 60px;
    .m-timeline-after {
      border-bottom: 2px var(--m-timeline-line-style)
        var(--m-timeline-back-line);
      border-left: none;
      width: calc(100% - 8px);
      height: 2px;
      transform: translateY(-50%);
    }
    .m-timeline-title {
      margin-top: -10px;
    }
    .m-timeline-item-main {
      padding: 0;
      text-align: center;
    }
  }
}
</style>
