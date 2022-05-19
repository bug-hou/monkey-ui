<!-- bgCheckBox -->
<template>
  <label
    :class="[
      bgSize,
      (disabled || (!isChecked && !isSelect)) && 'disabled',
      isButton && 'labelBorder',
      hasBorder && 'hasBorder',
      'm-check-box'
    ]"
    :style="[{ cursor: disabled && 'not-allowed' }]"
  >
    <input
      v-model="check"
      :type="isRadio ? 'radio' : 'checkbox'"
      :name="name"
      :disabled="disabled || (!isChecked && !isSelect)"
      :class="isButton && 'noMarge'"
      :value="value"
    />
    <p v-if="!isButton" :class="isRadio && 'radio'"></p>
    <div v-if="isButton" class="border"></div>
    <span>
      <slot> </slot>
    </span>
  </label>
</template>

<script setup lang="ts">
// 从下载的组件中导入函数
import { radioConfig } from "../config";
import { watch, withDefaults, defineProps, defineEmits, ref } from "vue";
import { useInject } from "../../../hooks";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    disabled?: boolean;
    name?: string;
    value: any;
    isRadio?: boolean;
    size?: string;
    border?: boolean;
    button?: boolean;
  }>(),
  {
    button: undefined,
    border: undefined,
    isRadio: undefined,
    disabled: undefined
  }
);

const emits = defineEmits(["update:modelValue"]);
const check = useInject(props.modelValue, radioConfig.modelValue);
const hasBorder = useInject(props.border, "border", false);
const isButton = useInject(props.button, radioConfig.button, false);
const bgSize = useInject(props.size, radioConfig.size, "small");
const disabled = useInject(props.disabled, radioConfig.disabled, false);

const isSelect = useInject(undefined, radioConfig.select);

let isChecked = ref(props.isRadio ? true : check.value.includes(props.value));

watch(
  check,
  (newValue) => {
    if (props.isRadio) {
      emits("update:modelValue", newValue);
    } else {
      if (newValue.includes(props.value)) {
        isChecked.value = true;
        emits("update:modelValue", newValue);
      } else {
        isChecked.value = false;
      }
    }
  },
  {
    deep: true
  }
);
</script>
<style scoped lang="less">
label {
  position: relative;
  color: var(--font-color-check-box);
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  padding-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  &.labelBorder {
    padding: 5px 15px;
  }
  &.hasBorder {
    border: 1px solid var(--border-color-check-box);
  }
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .border {
    transition: all 0.3s;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    border: 1px solid var(--border-color-check-box);
    z-index: -10;
    & + span {
      margin-left: 0;
      padding-left: 0;
    }
  }
}
input {
  display: none;
  position: absolute;
}
.noMarge {
  margin-left: 0;
}
.noMarge:checked ~ .border {
  background: var(--back-color-check-box);
}
.noMarge:checked ~ span {
  color: var(--font-color-check-box-border);
}
input + p {
  transition: all 0.3s;
  position: relative;
  box-sizing: border-box;
  border: 2px solid var(--border-color-check-box);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  padding: 1px;
  text-align: center;
  &.radio {
    border-radius: 50%;
  }
}
input:checked + p {
  background-clip: content-box;
  border-color: var(--border-color-check-box-active);
  box-shadow: 0px 0px 3px 1px var(--shadow-color-check-box);
  &::after {
    transition: all 0.3s;
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 8px;
    height: 8px;
    background-color: var(--back-color-check-box);
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 3px 1px var(--shadow-color-check-box);
  }
  &.radio::after {
    border-radius: 50%;
  }
}
input:checked + div {
  border-color: var(--border-color-check-box-active);
}
.select {
  visibility: hidden;
}
.mini {
  font-size: 14px;
  input {
    margin-left: 5px;
  }
  span {
    padding-left: 2px;
  }
}
.small {
  font-size: 16px;
  input {
    margin-left: 8px;
  }
  span {
    padding-left: 5px;
  }
}
.medium {
  font-size: 18px;
  input {
    margin-left: 10px;
  }
  span {
    padding-left: 7px;
  }
}
</style>
