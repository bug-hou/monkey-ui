<!-- bgSwitch -->
<template>
  <div
    :class="['m-switch', size]"
    :style="[{ background: isCheck ? checkColor : unCheckColor }, { color }]"
  >
    <div class="m-switch-button" :class="isCheck && 'm-switch-check'">
      <p v-if="isCheck">
        <slot name="checked"> bughou </slot>
      </p>
      <div class="m-switch-slider" @click="changeDirection"></div>
      <p v-if="!isCheck">
        <slot name="unChecked"> monkeysUI </slot>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 从下载的组件中导入函数
import { ref, withDefaults, defineProps } from "vue";

// 自定义方法引入

const props = withDefaults(
  defineProps<{
    ltValue: string;
    rtValue: string;
    ltIcon?: string;
    rtIcon?: string;
    size?: string;
    initial?: boolean;
    checkColor?: string;
    unCheckColor?: string;
    color: string;
    sliderColor: string;
    position: "out" | "in";
  }>(),
  {
    size: "small",
    checkColor: "#409eff",
    unCheckColor: "#dcdfe6",
    color: "white",
    initial: false,
    ltValue: "fjldskfjlskd",
    rtValue: "fjdsklfjsdklj",
    position: "in"
  }
);
const emits = defineEmits(["check", "unCheck"]);

const left = ref("left");
const right = ref("right");
const isCheck = ref(props.initial);
const changeDirection = () => {
  isCheck.value = !isCheck.value;
  if (isCheck.value) {
    emits("check");
  } else {
    emits("unCheck");
  }
};
</script>
<style scoped lang="less">
.m-switch {
  background: var(--back-color-switch);
  box-sizing: content-box;
  color: var(--font-color-switch);
  transition: all 0.5;
  display: inline-block;
  .m-switch-button {
    &.m-switch-check {
      left: 100%;
    }
    display: flex;
    transition: all 0.5s;
    position: relative;
    left: 2px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.mini {
  height: 18px;
  border-radius: 18px;
  .m-switch-slider {
    width: 15px;
    height: 15px;
    font-size: 12px;
    line-height: 15px;
    &.right {
      left: calc(100% - 17px);
    }
  }
}

.small {
  height: 24px;
  border-radius: 24px;
  .m-switch-slider {
    width: 20px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    background-color: #0ff;
    border-radius: 50%;
    &.right {
      left: calc(100% - 22px);
    }
  }
}
.medium {
  height: 34px;
  border-radius: 34px;
  .m-switch-slider {
    width: 30px;
    height: 30px;
    font-size: 18px;
    line-height: 30px;
    &.right {
      left: calc(100% - 32px);
    }
  }
}
</style>
