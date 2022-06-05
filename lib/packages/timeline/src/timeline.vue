<!-- bgTimeline -->
<template>
  <div class="mTimeline">
    <header v-if="showHeader">
      <slot name="title"> </slot>
    </header>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { defineComponent, provide, withDefaults, defineProps } from "vue";

const props = withDefaults(
  defineProps<{
    showHeader: boolean;
    backgroundLine: string;
    background: string;
    isShadow: boolean;
    isBorder: boolean;
    type: "success" | "info" | "warning" | "primary" | "error" | "default";
    iconName: string;
  }>(),
  {
    backgroundLine: "#e4e7ed",
    showHeader: true,
    type: "default"
  }
);
provide("type", props.type);
provide("icon", props.iconName);
provide("background", props.background);
provide("backgroundLine", props.backgroundLine);
provide("isBorder", props.isBorder);
provide("isShadow", props.isShadow);
</script>
<style scoped lang="less">
.mTimeline {
  width: 500px;
  header {
    width: 100%;
    height: 30px;
    font-size: 18px;
    line-height: 30px;
    text-align: center;
  }
}
</style>
