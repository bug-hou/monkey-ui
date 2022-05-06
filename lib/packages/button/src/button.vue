<!-- bgButton -->
<template>
  <button
    @click="handleClick"
    @touchend="handleTouch"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    @keydown=""
    :class="[size, shape, disabled && 'disabled', !plain && 'plain']"
    :style="[
      {
        ['--color']: plain ? textColor : plainTextColor
      },
      {
        ['--back']: plain ? color : plainColor
      },
      { ['--border']: borderColor },
      { ['--hover-color']: textColor },
      {
        ['--hover-back']: color
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
}

const props = withDefaults(defineProps<ButtonProps>(), {
  plain: undefined,
  loading: false,
  loadingName: "short"
});

const { TEXT_COLOR, TYPE, SHAPE, SIZE, DISABLED, BORDER_COLOR, COLOR, PLAIN } =
  ButtonNames;
const type = useInject(props.type, TYPE, "default");
const shape = useInject(props.shape, SHAPE, "rect");
const size = useInject(props.size, SIZE, "small");
const plain = useInject(props.plain, PLAIN, true);
const disabled = useInject(props.disabled, DISABLED, false);

const theme = LightTheme[type];

const color = useInject(props.color, COLOR, theme);
const plainColor = getLightColor(color, 0.8);
const textColor = useInject(props.textColor, TEXT_COLOR, "#fff");
const plainTextColor = color;
const borderColor = useInject(props.borderColor, BORDER_COLOR, theme);

const iconColor = ref(plain ? textColor : color);

provide(IconNames.HOVER_COLOR, iconColor);

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
  &.disabled {
    cursor: not-allowed;
    &:hover {
      color: var(--color);
      background: var(--back);
    }
  }
  .loading {
    display: inline-flex;
    align-items: center;
  }
}
.plain {
  &:hover {
    background: var(--hover-back);
    color: var(--hover-color);
  }
}
.mini {
  padding: 2px 8px;
  font-size: 12px;
  &.circle {
    width: 20px;
    height: 20px;
  }
}
.small {
  padding: 5px 15px;
  font-size: 14px;
  &.circle {
    width: 30px;
    height: 30px;
  }
}
.medium {
  padding: 8px 18px;
  font-size: 16px;
  &.circle {
    width: 40px;
    height: 40px;
  }
}
.big {
  font-size: 18px;
  padding: 10px 20px;
}
.rect {
  border-radius: 0px;
}
.round {
  border-radius: 10px;
}
.arc {
  border-radius: 20px;
}
.circle {
  overflow: hidden;
  text-align: center;
  border-radius: 50%;
  padding: 0;
}
</style>
