<!-- bgInputNumber -->
<template>
  <div
    :class="['bgInputNumber', size, hover && 'hover']"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <m-input
      class="m-input-number"
      type="number"
      v-model="value"
      @input="inputHandler"
      :suffix="controlsPosition !== 'left'"
      :prefix="controlsPosition !== 'right'"
      :useBorder="false"
      :size="size"
      v-bind="$attrs"
      :center="controlsPosition === 'between'"
      :disabled="disabled"
      :max="max"
      :min="min"
      :step="step"
      radius="5px"
      :inputDisabled="inputDisabled"
    >
      <template #prefix>
        <div
          v-if="controlsPosition === 'between'"
          :class="(value == min || disabled) && 'disabled'"
          class="input-number-common"
          @mousedown="continuousDecrement"
          @mouseup="stopDecrement"
        >
          <slot name="left">-</slot>
        </div>
        <div
          v-else-if="controlsPosition === 'left'"
          class="m-input-common-left"
        >
          <div
            :class="(value == max || disabled) && 'disabled'"
            class="m-input-left-child"
            @mousedown="continuousIncrement"
            @mouseup="stopIncrement"
          >
            <slot name="right"> + </slot>
          </div>
          <mDivider></mDivider>
          <div
            :class="(value == min || disabled) && 'disabled'"
            class="m-input-left-child"
            @mousedown="continuousDecrement"
            @mouseup="stopDecrement"
          >
            <slot name="left"> - </slot>
          </div>
        </div>
      </template>
      <template #suffix>
        <div
          v-if="controlsPosition === 'between'"
          :class="(value == max || disabled) && 'disabled'"
          class="input-number-common"
          @mousedown="continuousIncrement"
          @mouseup="stopIncrement"
        >
          <slot name="right">+</slot>
        </div>
        <div
          v-else-if="controlsPosition === 'right'"
          class="m-input-common-left"
        >
          <div
            :class="(value == max || disabled) && 'disabled'"
            class="m-input-left-child"
            @mousedown="continuousIncrement"
            @mouseup="stopIncrement"
          >
            <slot name="right"> + </slot>
          </div>
          <mDivider></mDivider>
          <div
            :class="(value == min || disabled) && 'disabled'"
            class="m-input-left-child"
            @mousedown="continuousDecrement"
            @mouseup="stopDecrement"
          >
            <slot name="left">-</slot>
          </div>
        </div>
      </template>
    </m-input>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { ref, watch, withDefaults, defineProps } from "vue";

import mInput from "../../input/src/input.vue";
import mDivider from "../../divider/src/divider.vue";

// 自定义方法引入

// 自定义组件引入
const props = withDefaults(
  defineProps<{
    step?: number;
    max?: number;
    min?: number;
    fixed?: number;
    size?: "mini" | "small" | "medium";
    modelValue: number | string;
    controlsPosition?: "between" | "left" | "right";
    disabled?: boolean;
    inputDisabled?: boolean;
  }>(),
  {
    size: "small",
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    fixed: 0,
    step: 1,
    controlsPosition: "between",
    disabled: false,
    inputDisabled: false
  }
);
const emits = defineEmits(["update:modelValue"]);
const zero = 0;
const value = ref<number | string>(
  props.modelValue > props.max || props.modelValue < props.min
    ? props.min === Number.MIN_SAFE_INTEGER
      ? processFiexd(zero, props.fixed)
      : processFiexd(props.min, props.fixed)
    : processFiexd(props.modelValue, props.fixed)
);
watch(
  () => props.modelValue,
  (newValue) => {
    value.value = processFiexd(newValue, props.fixed);
  }
);
const hover = ref(false);
const inputHandler = (event) => {
  if (event.target.value !== "") {
    const userInput = processFiexd(+event.target.value, props.fixed);
    if (!isNaN(Number(userInput))) {
      if (+userInput > props.max) {
        value.value = processFiexd(props.max, props.fixed);
      } else if (+userInput < props.min) {
        value.value = processFiexd(props.min, props.fixed);
      } else {
        value.value = userInput;
      }
    } else {
      value.value = undefined;
    }
    emits("update:modelValue", +value.value);
  }
};
const decrement = () => {
  value.value =
    +value.value - props.step < props.min
      ? processFiexd(value.value, props.fixed)
      : processFiexd(+value.value - props.step, props.fixed);
  emits("update:modelValue", +value.value);
};
const increment = () => {
  value.value =
    +value.value + props.step > props.max
      ? processFiexd(value.value, props.fixed)
      : processFiexd(+value.value + props.step, props.fixed);
  emits("update:modelValue", +value.value);
};

let mouseUp = false;

function continuousIncrement() {
  processContinuous(increment);
}
function continuousDecrement() {
  processContinuous(decrement);
}
function stopIncrement() {
  if (!props.disabled) {
    increment();
    mouseUp = true;
  }
}
function stopDecrement() {
  if (!props.disabled) {
    decrement();
    mouseUp = true;
  }
}
function processContinuous(execFn: Function) {
  if (!props.disabled) {
    mouseUp = false;
    setTimeout(() => {
      let timer = setInterval(() => {
        if (!mouseUp) {
          execFn();
        } else {
          clearInterval(timer);
        }
      }, 100);
    }, 300);
  }
}

function processFiexd(num: any, fixed: number) {
  if (typeof num === "number") {
    return +num.toFixed(fixed);
  }
  return num;
}
</script>
<style scoped lang="less">
.bgInputNumber {
  display: inline-flex;
  padding: 0 1px;
  .m-input-common-left {
    width: 40px;
    height: 100%;
    display: flex;
    flex-direction: column;
    .m-input-left-child {
      width: 100%;
      height: 50%;
      background: var(--back-color-input-number);
      color: var(--font-color-input-number);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        color: var(--font-color-input-number-active);
      }
      &.disabled {
        cursor: not-allowed;
        background: var(--back-color-input-number-disabled);
        color: #0005;
      }
    }
  }
  &.hover {
    border-color: var(--border-color-input-number-active);
  }
  .input-number-common {
    width: 30px;
    height: 100%;
    background: var(--back-color-input-number);
    color: var(--font-color-input-number);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: var(--font-color-input-number-active);
    }
    &.disabled {
      cursor: not-allowed;
      background: var(--back-color-input-number-disabled);
      color: #0005;
    }
  }
  .m-input-number {
    width: 100%;
    height: 100%;
    border: none;
    text-align: center;
    font-size: 0.9em;
  }
}
.mini {
  width: 140px;
  height: 30px;
  font-size: 16px;
  div {
    font-size: 18px;
  }
}
.small {
  width: 160px;
  height: 36px;
  font-size: 18px;
  div {
    font-size: 22px;
  }
}
.medium {
  width: 180px;
  height: 42px;
  font-size: 20px;
  div {
    font-size: 26px;
  }
}
</style>
