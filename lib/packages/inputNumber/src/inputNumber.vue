<!-- bgInputNumber -->
<template>
  <div
    :class="['bgInputNumber', size, hover && 'hover']"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <div
      @click="decrement"
      :class="value == min && 'disabled'"
      class="input-number-common"
    >
      <slot name="left">-</slot>
    </div>
    <input type="text" v-model="value" @input="inputHandler" v-bind="$attrs" />
    <div
      @click="increment"
      :class="value == max && 'disabled'"
      class="input-number-common"
    >
      <slot name="right">+</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { ref, watch, withDefaults, defineProps } from "vue";

// 自定义方法引入

// 自定义组件引入
const props = withDefaults(
  defineProps<{
    step?: number;
    max?: number;
    min?: number;
    fixed?: number;
    size?: "mini" | "small" | "medium";
    modelValue: any;
  }>(),
  {
    size: "small",
    min: 0,
    max: 100,
    fixed: 0,
    step: 1
  }
);
const emits = defineEmits(["update:modelValue"]);
const value = ref(props.modelValue ?? 0);
watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue;
  }
);
const hover = ref(false);
let precentValue = undefined;
const inputHandler = (event) => {
  const userInput = +event.target.value;
  if (!isNaN(Number(userInput))) {
    if (+userInput > props.max) {
      value.value = props.max;
    } else if (+userInput < props.min) {
      value.value = props.min;
    } else {
      value.value = userInput;
    }
  } else {
    value.value = precentValue;
  }
  emits("update:modelValue", value.value);
};
const decrement = () => {
  value.value =
    value.value - props.step < props.min
      ? value.value
      : +(value.value - props.step).toFixed(props.fixed);
  emits("update:modelValue", value.value);
};
const increment = () => {
  value.value =
    value.value + props.step > props.max
      ? value.value
      : +(value.value + props.step).toFixed(props.fixed);
  emits("update:modelValue", value.value);
};
</script>
<style scoped lang="less">
.bgInputNumber {
  display: inline-flex;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--border-color-input-number);
  font-size: 0;
  &.hover {
    border-color: var(--border-color-input-number-active);
  }
  .input-number-common {
    &:hover {
      color: var(--font-color-input-number-active);
    }
    width: 22%;
    height: 100%;
    background: var(--back-color-input-number);
    color: var(--font-color-input-number);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &.disabled {
      cursor: not-allowed;
      background: var(--back-color-input-number-disabled);
    }
  }
  input {
    width: 56%;
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
  height: 38px;
  font-size: 18px;
  div {
    font-size: 22px;
  }
}
.medium {
  width: 180px;
  height: 44px;
  font-size: 20px;
  div {
    font-size: 26px;
  }
}
</style>
