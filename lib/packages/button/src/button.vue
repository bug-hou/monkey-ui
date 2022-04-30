<!-- bgButton -->
<template>
  <button
    @click="handleClick"
    @touchend="handleTouch"
    @keydown=""
    :class="[size, shape, disabled && 'disabled']"
    :style="[
      {
        ['--color']: plain ? hoverColor : color
      },
      {
        ['--back']: plain ? hoverBackgroundColor : backgroundColor
      },
      { ['--border']: borderColor },
      { ['--hover-color']: hoverColor },
      {
        ['--hover-back']: hoverBackgroundColor
      }
    ]"
  >
    <div v-if="loading">
      <slot name="icon"></slot>
    </div>
    <slot> </slot>
  </button>
</template>

<script lang="ts" setup name="mButton">
// 从下载的组件中导入函数
import { defineEmits, defineProps, withDefaults } from "vue";

import { useInject } from "../../../hooks";

import { LightTheme } from "../../../common/style";

import { getLightColor } from "../../../utils/index";

type ButtonType =
  | "success"
  | "error"
  | "info"
  | "primary"
  | "warning"
  | "default";

type ButtonShape = "rect" | "round" | "arc" | "circle";

type ButtonSize = "medium" | "small" | "mini";

interface ButtonProps {
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  shape?: ButtonShape;
  plain?: boolean;
  size?: ButtonSize;
  color?: string;
  hoverColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "default",
  disabled: false,
  loading: false,
  shape: "rect",
  plain: true,
  size: "small"
});

const emits = defineEmits(["mClick", "mTouch"]);

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emits("mClick", event);
  }
};

const handleTouch = (event: TouchEvent) => {
  if (!props.disabled) {
    emits("mClick", event);
  }
};

const theme = LightTheme[props.type];

const color = useInject(props.color, "color", theme.color);
const backgroundColor = useInject(
  props.backgroundColor,
  "backgroundColor",
  theme.backgroundColor
);
const hoverColor =
  useInject(props.hoverColor, "hoverColor", theme.hoverColor) ??
  (!props.plain && getLightColor(props.color, 0.5));
const hoverBackgroundColor =
  useInject(
    props.hoverBackgroundColor,
    "hoverBackgroundColor",
    theme.hoverBackgroundColor
  ) ??
  (!props.plain && getLightColor(props.backgroundColor, 0.5));
const borderColor = useInject(props.borderColor, "border", theme.borderColor);
</script>
<style scoped lang="less">
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
button {
  display: inline-flex;
  padding: 2px 10px;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  border: 1px var(--border) solid;
  color: var(--color);
  background: var(--back);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    background: var(--hover-back);
    color: var(--hover-color);
  }
  &.disabled {
    cursor: not-allowed;
    &:hover {
      color: var(--color);
      background: var(--back);
    }
  }
  > div {
    p {
      animation: rotate 3s linear infinite;
    }
    font-size: inherit;
    margin-right: 3px;
  }
}
.mini {
  padding: 2px 8px;
  font-size: 12px;
}
.small {
  padding: 5px 15px;
  font-size: 14px;
}
.medium {
  padding: 10px 20px;
  font-size: 16px;
}
.rect {
  border-radius: 0;
}
.round {
  border-radius: 10px;
}
.arc {
  border-radius: 50px;
}
.circle {
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  padding: 0;
}
</style>
