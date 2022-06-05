<!--  -->
<template>
  <div class="m-rate" :class="'m-rate-' + size">
    <div
      class="m-rate-icon"
      :style="[
        { ['--m-rate-active-color']: color },
        { ['--m-rate-color']: defaultColor },
        { ['--m-rate-precent']: precent + '%' }
      ]"
    >
      <m-icon
        v-for="(_, index) in count"
        name="m-star"
        class="m-rate-icon-star"
        @click="clickHandle(index, $event)"
      >
      </m-icon>
    </div>
    <slot :precent="value">
      <p v-if="show">{{ prefix + value + suffix }}</p>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, withDefaults, defineProps, defineEmits } from "vue";

const props = withDefaults(
  defineProps<{
    count?: number;
    modelValue: number;
    color?: string;
    size?: "mini" | "small" | "medium";
    icon?: string;
    type?: "all" | "half" | "wantonly";
    prefix?: string;
    suffix?: string;
    readonly?: boolean;
    show?: boolean;
    fixed?: number;
    defaultColor?: string;
  }>(),
  {
    icon: "m-star",
    count: 5,
    color: "#f7ba2a",
    size: "small",
    type: "all",
    defaultColor: "#c6d1de",
    show: false,
    fixed: 1,
    suffix: "",
    prefix: ""
  }
);
const emits = defineEmits(["update:modelValue"]);
const precent = ref((props.modelValue / props.count) * 100);
const value = ref(props.modelValue.toFixed(props.fixed));
function clickHandle(index: number, event) {
  if (!props.readonly) {
    if (props.type === "wantonly") {
      precent.value = Math.ceil(
        ((index + +(event.offsetX / event.target.offsetWidth).toFixed(1)) /
          props.count) *
          100
      );
    } else if (props.type === "half") {
      precent.value = Math.ceil(
        ((index +
          (+(event.offsetX / event.target.offsetWidth).toFixed(1) > 0.5
            ? 1
            : 0.5)) /
          props.count) *
          100
      );
    } else {
      precent.value = Math.ceil(
        ((index +
          Math.ceil(+(event.offsetX / event.target.offsetWidth).toFixed(1))) /
          props.count) *
          100
      );
    }
    value.value = ((precent.value / 100) * (props.count - 0) + 0).toFixed(
      props.fixed
    );
    emits("update:modelValue", +value.value);
  }
}
</script>
<style scoped lang="less">
@pColor: #6669;
@pTextColor: white;
.m-rate {
  display: flex;
  align-items: center;
  p {
    margin-left: 20px;
    padding: 0 10px;
    border-radius: 5px;
    color: @pTextColor;
    background-color: @pColor;
    height: 90%;
  }
}
.m-rate-icon {
  background-image: linear-gradient(
    90deg,
    var(--m-rate-active-color),
    var(--m-rate-active-color) var(--m-rate-precent),
    var(--m-rate-color) var(--m-rate-precent),
    var(--m-rate-color)
  );
  transition: all 0.5s;
  -webkit-background-clip: text;
  background-clip: text;
  .m-rate-icon-star {
    display: inline-block;
    color: transparent;
    font-size: inherit;
    cursor: pointer;
    margin: 0 5px;
  }
}
.m-rate-mini {
  height: 20px;
  font-size: 14px;
}
.m-rate-small {
  height: 25px;
  font-size: 16px;
}
.m-rate-medium {
  height: 25px;
  font-size: 20px;
}
</style>
