<!-- bgSwitch -->
<template>
  <div
    :class="[
      'm-switch',
      'm-switch-' + size,
      isChangeCheck && 'm-switch-slider-big',
      disabled && 'm-switch-disabled'
    ]"
    :style="[
      { background: isCheck ? checkColor : unCheckColor },
      { color },
      { ['--m-switch-max-width']: maxWidth + 'px' },
      { ['--m-switch-shadow-color']: isCheck ? checkColor : unCheckColor },
      { ['--m-switch-box-radius']: boxRadius + 'px' },
      { ['--m-switch-slider-back']: sliderColor }
    ]"
  >
    <div
      class="m-switch-button"
      :class="isCheck && 'm-switch-check'"
      @mousedown="mouseDownHandle"
      @mouseup="mouseUpHandle"
      @mouseleave="mouseLeaveHandle"
    >
      <p ref="checkRef">
        <slot name="checked"> {{ checkValue }} </slot>
      </p>
      <div class="m-switch-slider">
        <div v-if="isCheck && checkIconName">
          <slot name="checkIcon">
            <m-icon :name="checkIconName"></m-icon>
          </slot>
        </div>
        <div v-if="!isCheck && unCheckIconName">
          <slot name="unCheckIcon">
            <m-icon :name="unCheckIconName"></m-icon>
          </slot>
        </div>
      </div>
      <p ref="unCheckRef">
        <slot name="unChecked"> {{ unCheckValue }} </slot>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 从下载的组件中导入函数
import { ref, withDefaults, defineProps, onMounted, watch } from "vue";

const props = withDefaults(
  defineProps<{
    checkValue?: string;
    unCheckValue?: string;
    checkIconName?: string;
    unCheckIconName?: string;
    size?: string;
    modelValue: boolean;
    checkColor?: string;
    unCheckColor?: string;
    color?: string;
    sliderColor?: string;
    radius?: number;
    disabled?: boolean;
  }>(),
  {
    size: "small",
    checkColor: "#18a058",
    unCheckColor: "#dbdbdb",
    color: "#fff",
    radius: 10,
    disabled: false,
    sliderColor: "#fff"
  }
);
const emits = defineEmits(["check", "unCheck", "update:modelValue"]);

const mapSize = {
  mini: 10,
  small: 15,
  medium: 20
};

const checkRef = ref<HTMLElement>();
const unCheckRef = ref<HTMLElement>();

const currentSize = mapSize[props.size];
const boxRadius = Math.ceil((currentSize * props.radius) / 10);
const maxWidth = ref(currentSize * 2);
const isCheck = ref(props.modelValue);
const isChangeCheck = ref(false);

watch(
  () => props.modelValue,
  (newValue) => {
    isCheck.value = newValue;
  }
);

function mouseDownHandle() {
  processDisabled(() => {
    isChangeCheck.value = true;
  });
}

function mouseUpHandle() {
  processDisabled(() => {
    if (isChangeCheck.value) {
      isCheck.value = !isCheck.value;
      isChangeCheck.value = false;
      emits("update:modelValue", isCheck.value);
      if (isCheck.value) {
        emits("check");
      } else {
        emits("unCheck");
      }
    }
  });
}

function mouseLeaveHandle() {
  processDisabled(() => {
    isChangeCheck.value = false;
  });
}

function processDisabled(fn: Function) {
  if (!props.disabled) {
    fn();
  }
}

onMounted(() => {
  const leftWidth = checkRef.value.clientWidth;
  const rightWidth = unCheckRef.value.clientWidth;
  maxWidth.value = Math.max(maxWidth.value, Math.max(leftWidth, rightWidth));
  if (maxWidth.value === leftWidth) {
    unCheckRef.value.style.width = maxWidth.value + "px";
  } else if (maxWidth.value === rightWidth) {
    checkRef.value.style.width = maxWidth.value + "px";
  } else {
    checkRef.value.style.width = maxWidth.value + "px";
    unCheckRef.value.style.width = maxWidth.value + "px";
  }
});
</script>
<style scoped lang="less">
.m-switch {
  background: var(--back-color-switch);
  transition: box-shadow 0.5s;
  box-sizing: content-box;
  overflow: hidden;
  display: inline-flex;
  position: relative;
  padding: 3px;
  border-radius: var(--m-switch-box-radius);
  &.m-switch-disabled {
    .m-switch-button {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
  &.m-switch-slider-big {
    box-shadow: 0px 0px 5px 2px var(--m-switch-shadow-color);
  }
  .m-switch-button {
    cursor: pointer;
    position: absolute;
    right: 3px;
    transition: all 1s;
    display: flex;
    &.m-switch-check {
      right: calc(-1 * var(--m-switch-max-width));
    }
    .m-switch-slider {
      background-color: var(--m-switch-slider-back);
      margin: 0 5px;
      transition: all 0.5s;
      color: rgb(118, 124, 130);
      text-align: center;
    }
    p {
      white-space: nowrap;
    }
  }
}
.m-switch-mini {
  height: 15px;
  width: calc(var(--m-switch-max-width) + 22px);
  font-size: 12px;
  .m-switch-slider {
    width: 15px;
    height: 15px;
    line-height: 15px;
    border-radius: 15px;
  }
}

.m-switch-small {
  height: 20px;
  width: calc(var(--m-switch-max-width) + 27px);
  font-size: 14px;
  .m-switch-slider {
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 20px;
  }
}
.m-switch-medium {
  height: 30px;
  width: calc(var(--m-switch-max-width) + 37px);
  font-size: 18px;
  .m-switch-slider {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 30px;
  }
}
</style>
