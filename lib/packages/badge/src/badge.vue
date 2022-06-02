<!-- bgBadge -->
<template>
  <div class="m-badge-container">
    <slot></slot>
    <div
      :class="['m-badge', dot && 'm-badge-dot', medium && 'm-badge-medium']"
      :style="[{ ['--m-badge-back']: color ?? colors[type] }]"
      v-if="show && (!showZero || value !== 0)"
    >
      <slot name="value">
        <p v-if="!dot && typeof value === 'number' && value <= max">
          <m-number-animation
            active
            :from="value"
            :to="value"
            effect="scroll"
            color="#fff"
            :fontSize="medium ? 14 : 12"
          ></m-number-animation>
        </p>
        <p v-else>
          {{ dot ? "" : max < value ? max + "+" : value }}
        </p>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { withDefaults } from "vue";
import { LightTheme } from "../../../common/style";
import mNumberAnimation from "../../numberAnimation/src/numberAnimation.vue";

// 自定义方法引入
const props = withDefaults(
  defineProps<{
    value?: string | number;
    dot?: boolean;
    max?: number;
    type?: "success" | "default" | "warning" | "error" | "primary" | "info";
    color?: string;
    show?: boolean;
    showZero?: boolean;
    medium?: boolean;
  }>(),
  {
    type: "default",
    dot: false,
    show: true,
    max: Number.MAX_SAFE_INTEGER,
    medium: false
  }
);
const color = props.color ?? LightTheme[props.type];
</script>
<style scoped lang="less">
.m-badge-container {
  position: relative;
  display: inline-block;
  .m-badge {
    position: absolute;
    left: 100%;
    top: 0;
    font-size: 12px;
    transform: translate(-50%, -50%);
    color: white;
    background: var(--m-badge-back);
    border-radius: 50px;
    padding: 0 5px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.m-badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      padding: 0 0;
    }
  }
  .m-badge-medium {
    height: 18px;
    padding: 0 8px;
    font-size: 14px;
    &.m-badge-dot {
      width: 13px;
      height: 13px;
      border-radius: 50%;
      padding: 0 0;
    }
  }
}
</style>
