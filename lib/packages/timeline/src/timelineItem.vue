<!-- bgTimelineItem -->
<template>
  <div
    class="mTimelineItem"
    :style="[
      { ['--m-timeline-back']: background },
      { ['--m-timeline-back-line']: backgroundLine }
    ]"
  >
    <m-icon :name="iconName" class="m-timeline-after"></m-icon>
    <p class="m-timeline-after"></p>
    <p class="m-timeline-time">{{ timestamp }}</p>
    <div
      :class="[
        isShadow && 'm-timeline-shadow',
        isBorder && 'm-timeline-border',
        'm-timeline-content'
      ]"
    >
      <slot name="main">
        <p class="m-timeline-content">
          <slot> {{ content }}</slot>
        </p>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { withDefaults, defineProps } from "vue";
import { useInject } from "../../../hooks";
import { LightTheme } from "../../../common/style";

// 自定义方法引入
const props = withDefaults(
  defineProps<{
    showHeader: boolean;
    backgroundLine: string;
    background: string;
    isShadow: boolean;
    isBorder: boolean;
    type: "success" | "info" | "warning" | "primary" | "error" | "default";
    iconName: string;
    timestamp: string;
    content: string;
  }>(),
  {
    backgroundLine: "#e4e7ed",
    showHeader: true
  }
);

const type = useInject(props.type, "type", "default");
const colors = LightTheme[type];
const iconName = useInject(props.iconName, "iconName");
const background = useInject(props.background, "background", colors);
const backgroundLine = useInject(
  props.backgroundLine,
  "backgroundLine",
  "#e4e7ed"
);
const isBorder = useInject(props.isBorder, "isBorder", false);
const isShadow = useInject(props.isShadow, "isShadow", false);
</script>
<style scoped lang="less">
.mTimelineItem {
  position: relative;
  width: 100%;
  padding-left: 20px;
  .m-timeline-time {
    color: var(--font-color-timeline-time);
    width: 100%;
    padding: 5px 0 5px 10px;
    font-size: 13px;
    font-weight: 500;
  }
  .m-timeline-content {
    background: var(--back-color-timeline-content);
    transition: all 0.5s;
    color: var(--font-color-timeline-time-content);
    padding: 5px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 6px;
    &.m-timeline-shadow {
      box-shadow: 0 2px 12px 0px var(--shadow-color-timeline);
    }
    &.m-timeline-border {
      padding: 15px;
      width: 100%;
      border: 1px solid var(--border-color-timeline);
    }
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
    border-radius: 50%;
    background: var(--m-timeline-back);
    z-index: 100;
  }
  .m-timeline-after {
    top: 14px;
    width: 2px;
    height: calc(100% - 8px);
    background: var(--m-timeline-back-line);
  }
}
</style>
