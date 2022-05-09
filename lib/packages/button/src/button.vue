<!-- bgButton -->
<template>
  <button
    @click="handleClick"
    @touchend="handleTouch"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    @keydown=""
    class="m-button"
    :class="[
      'button-' + size,
      'button-' + shape,
      disabled && 'disabled',
      !plain && 'plain',
      text && 'text',
      textFixed && 'fixed'
    ]"
    :style="[
      {
        ['--color']: plain ? textColor : plainTextColor
      },
      {
        ['--back']: plain ? color : plainColor
      },
      {
        ['--border']: borderColor
      },
      {
        ['--hover-color']: textColor
      },
      {
        ['--hover-back']: color
      },
      {
        ['--text']: textColor === '#fff' ? borderColor : textColor
      }
    ]"
  >
    <div class="loading" v-if="loading">
      <component :is="loadingMap[loadingName]" :color="iconColor"></component>
    </div>
    <slot name="icon" v-else> </slot>
    <slot> </slot>
  </button>
</template>

<script lang="ts" setup name="mButton">
// 从下载的组件中导入函数
import { defineEmits, defineProps, withDefaults, provide, ref } from "vue";

import { useInject } from "../../../hooks";

import { LightTheme } from "../../../common/style";

import { getLightColor } from "../../../utils/index";

import {
  ShortLoadingVue,
  SlowLoadingVue,
  TopLoadingVue,
  LongLoadingVue,
  GrowLoadingVue,
  DeepLoadingVue,
  LoopLoadingVue
} from "../../../common/loading";

import ButtonNames from "../config";
import IconNames from "../../icon/config";

import type {
  Size as ButtonSize,
  Type as ButtonType,
  Shape as ButtonShape
} from "../../../type/index.type";

const loadingMap = {
  short: ShortLoadingVue,
  loop: LoopLoadingVue,
  grow: GrowLoadingVue,
  slow: SlowLoadingVue,
  deep: DeepLoadingVue,
  long: LongLoadingVue,
  top: TopLoadingVue
};

type LoadingNames =
  | "short"
  | "loop"
  | "top"
  | "grow"
  | "slow"
  | "deep"
  | "long";

interface ButtonProps {
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  shape?: ButtonShape;
  plain?: boolean;
  size?: ButtonSize;
  color?: string;
  borderColor?: string;
  textColor?: string;
  loadingName?: LoadingNames;
  text?: boolean;
  textFixed?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  plain: undefined,
  loading: false,
  loadingName: "short",
  text: undefined,
  textFixed: false
});

const {
  TEXT_COLOR,
  TYPE,
  SHAPE,
  SIZE,
  DISABLED,
  BORDER_COLOR,
  COLOR,
  PLAIN,
  TEXT
} = ButtonNames;
const type = useInject(props.type, TYPE, "default");
const shape = useInject(props.shape, SHAPE, "rect");
const size = useInject(props.size, SIZE, "small");
const plain = useInject(props.plain, PLAIN, true);
const disabled = useInject(props.disabled, DISABLED, false);
const text = useInject(props.text, TEXT, false);

const theme = LightTheme[type];

const color = useInject(props.color, COLOR, theme);
const plainColor = getLightColor(color, 0.8);
const textColor = useInject(props.textColor, TEXT_COLOR, "#fff");
const plainTextColor = color;
const borderColor = useInject(props.borderColor, BORDER_COLOR, color);

const iconColor = ref(plain ? textColor : color);

const emits = defineEmits(["mClick", "mTouch"]);

const handleClick = (event: MouseEvent) => {
  if (!disabled) {
    emits("mClick", event);
  }
};

const handleTouch = (event: TouchEvent) => {
  if (!disabled) {
    emits("mClick", event);
  }
};
function handleEnter() {
  if (!disabled && !plain) {
    iconColor.value = textColor;
  }
}
function handleLeave() {
  if (!disabled && !plain) {
    iconColor.value = color;
  }
}
</script>
<style scoped lang="less">
.m-button {
  transition: all 0.3s;
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
  .loading {
    display: inline-flex;
    align-items: center;
  }
  &.plain {
    &:hover {
      background: var(--hover-back);
      color: var(--hover-color);
    }
  }
  &.text {
    border: none;
    background-color: transparent;
    color: #666;
    font-weight: bold;
    &.fixed {
      color: var(--text);
    }
    &:hover {
      color: var(--text);
    }
  }
  &.disabled {
    cursor: not-allowed;
    &:hover {
      color: var(--color);
      background: var(--back);
    }
  }
}
.button-mini {
  padding: 2px 8px;
  font-size: 12px;
  &.button-circle {
    width: 20px;
    height: 20px;
  }
}
.button-small {
  padding: 5px 15px;
  font-size: 14px;
  &.button-circle {
    width: 30px;
    height: 30px;
  }
}
.button-medium {
  padding: 8px 18px;
  font-size: 16px;
  &.button-circle {
    width: 40px;
    height: 40px;
  }
}
.button-big {
  font-size: 18px;
  padding: 10px 20px;
}
.button-rect {
  border-radius: 0px;
}
.button-round {
  border-radius: 10px;
}
.button-arc {
  border-radius: 20px;
}
.button-circle {
  overflow: hidden;
  text-align: center;
  border-radius: 50%;
  padding: 0;
}
</style>
