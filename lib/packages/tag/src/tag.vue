<!-- bgTag -->
<template>
  <div
    :class="[
      'mTag',
      'm-tag-' + effect,
      'm-tag-' + size,
      rounded && 'm-tag-rounded',
      active && 'm-tag-active',
      disabled && 'm-tag-disabled'
    ]"
    :style="[
      { ['--m-tag-color']: color },
      { ['--m-tag-background']: background }
    ]"
  >
    <slot></slot>
    <m-icon
      class="m-tag-icon"
      name="m-cha"
      v-if="closabled"
      @click.stop="changecancle"
    ></m-icon>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { ref, withDefaults, defineProps } from "vue";
import { LightTheme } from "../../../common/style/index";

import { getLightColor } from "../../../utils";

const props = withDefaults(
  defineProps<{
    effect?: "light" | "dark" | "plain";
    color?: string;
    type?: "success" | "error" | "info" | "primary" | "warning" | "default";
    size?: "mini" | "small" | "medium";
    rounded?: boolean;
    background?: boolean;
    isCancle?: boolean;
    closabled?: boolean;
    disabled?: boolean;
  }>(),
  {
    effect: "plain",
    type: "default",
    size: "small",
    isCancle: false,
    closabled: false,
    background: undefined,
    disabled: false
  }
);
const emits = defineEmits(["close", "bgClick"]);
const colors = LightTheme;
const active = ref(false);

const color = props.color ?? colors[props.type];
const background = props.background ?? getLightColor(color, 0.8);
const changecancle = () => {
  if (!props.disabled) {
    emits("close");
  }
};
</script>
<style scoped lang="less">
.mTag {
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 14px;
  height: 24px;
  cursor: pointer;
  background: var(--m-tag-background);
  color: var(--m-tag-color);
  border-color: var(--m-tag-color);
  transition: opacity 0.5s;
  border: 1px solid var(--m-tag-color);
  &.m-tag-rounded {
    border-radius: 20px;
  }
  &.m-tag-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .m-tag-icon {
    font-size: 8px;
    text-align: center;
    margin-left: 3px;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    line-height: 18px;
    transition: all 0.5s;
    &:hover {
      color: white;
      background-color: var(--m-tag-color);
    }
  }
}
.m-tag-mini {
  font-size: 12px;
  padding: 1px 4px;
  height: 22px;
}
.m-tag-medium {
  padding: 2px 10px;
  font-size: 16px;
  height: 30px;
}
.m-tag-light {
  border: 1px solid var(--m-tag-color);
  color: var(--m-tag-color);
  background-color: white;
}
.m-tag-dart {
  background-color: var(--m-tag-color);
  color: white;
}
.m-tag-plain {
  background: var(--m-tag-background);
}
</style>
