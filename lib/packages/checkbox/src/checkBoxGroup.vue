<!-- bgRadioGroup -->
<template>
  <div class="m-check-box-group">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { provide, ref, watch, withDefaults, defineProps } from "vue";

import { radioConfig } from "../config";

const props = withDefaults(
  defineProps<{
    name: string;
    modelValue: any[];
    disabled?: boolean;
    selectColor?: string;
    button?: boolean;
    border?: boolean;
    size?: "mini" | "small" | "medium";
    max?: number;
    min?: number;
  }>(),
  {
    max: Number.MAX_SAFE_INTEGER
  }
);

const emits = defineEmits(["update:modelValue"]);

const isSelect = ref(!!(props.modelValue.length < props.max));

const value = ref(props.modelValue);
watch(value, (newValue) => {
  if (newValue.length === props.max) {
    isSelect.value = false;
  } else {
    isSelect.value = true;
  }
  if (newValue.length <= props.max) {
    emits("update:modelValue", newValue);
  }
});
provide(radioConfig.select, isSelect);
provide(radioConfig.name, props.name);
provide(radioConfig.modelValue, value);
provide(radioConfig.size, props.size ?? "small");
provide(radioConfig.button, props.button ?? false);
provide("border", props.border ?? false);
provide(radioConfig.disabled, props.disabled ?? false);
</script>
<style lang="less">
.m-check-box-group {
  .m-check-box:first-child {
    .border {
      border-radius: 10px 0 0 10px;
    }
  }
  .m-check-box:last-child {
    .border {
      border-radius: 0 10px 10px 0;
    }
  }
}
</style>
