<!-- bgButton -->
<template>
  <button
    @click="handleClick"
    @touchend="handleTouch"
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
    <div v-if="loading">
      <slot name="icon">
        <loop-vue></loop-vue>
      </slot>
    </div>
    <slot> </slot>
  </button>
</template>

<script lang="ts" setup name="mButton">
// 从下载的组件中导入函数
import { defineEmits, defineProps, withDefaults, provide, ref } from "vue";

import { useInject } from "../../../hooks";

import { LightTheme } from "../../../common/style";

import { getLightColor } from "../../../utils/index";

import ButtonNames from "../config";
import IconNames from "../../icon/config";

import type {
  Size as ButtonSize,
  Type as ButtonType,
  Shape as ButtonShape
} from "../../../type/index.type";

import loopVue from "../../../common/loading/loop.vue";

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
}

const props = withDefaults(defineProps<ButtonProps>(), {
  plain: undefined,
  loading: false
});

const {
  TEXT_COLOR,
  TYPE,
  SHAPE,
  SIZE,
  LOADING,
  DISABLED,
  BORDER_COLOR,
  COLOR,
  PLAIN
} = ButtonNames;
const type = useInject(props.type, TYPE, "default");
const shape = useInject(props.shape, SHAPE, "rect");
const size = useInject(props.size, SIZE, "small");
const plain = useInject(props.plain, PLAIN, true);
const loading = useInject(props.loading, LOADING, false);
const disabled = useInject(props.disabled, DISABLED, false);

const theme = LightTheme[type];

const color = useInject(props.color, COLOR, theme);
const plainColor = getLightColor(color, 0.8);
const textColor = useInject(props.textColor, TEXT_COLOR, "#fff");
const plainTextColor = color;
const borderColor = useInject(props.borderColor, BORDER_COLOR, theme);

const iconColor = ref(color);

provide(IconNames.COLOR, color);
provide(IconNames.HOVER_COLOR, textColor);

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
  > div {
    p {
      animation: rotate 3s linear infinite;
    }
    font-size: inherit;
    margin-right: 3px;
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
  border-radius: 50px;
}
.circle {
  overflow: hidden;
  text-align: center;
  border-radius: 50%;
  padding: 0;
}
</style>
