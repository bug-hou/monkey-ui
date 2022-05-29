<!-- bgBadge -->
<template>
  <div class="m-badge-container">
    <slot></slot>
    <div
      :class="['m-badge', dot && 'm-badge-dot']"
      :style="[{ ['--back']: color ?? colors[type] }]"
      v-if="showBadge"
    >
      {{ dot ? "" : maxValue < value ? maxValue + "+" : value }}
    </div>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { defineComponent, withDefaults } from "vue";

// 自定义方法引入
const props = withDefaults(
  defineProps<{
    value: string | number;
    dot?: boolean;
    max?: number;
    type?: "success" | "default" | "warning" | "error" | "primary";
    color?: string;
    show?: boolean;
  }>(),
  {}
);

</script>
<style scoped lang="less">
.m-badge-container {
  position: relative;
  display: inline-block;
  .m-badge {
    position: absolute;
    left: 100%;
    top: 0;
    transform: translate(-50%, -50%);
    font-size: 8px;
    color: white;
    background: var(--back);
    padding: 2px 8px;
    border-radius: 50px;
    &.m-badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      padding: 0 0;
    }
  }
}
</style>
