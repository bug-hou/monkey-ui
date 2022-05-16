<!-- bgRadioGroup -->
<template>
  <div class="m-radio-group">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { provide, ref, watch, withDefaults, defineProps } from "vue";

import { radioConfig } from "../../checkbox/config";

const props = withDefaults(
  defineProps<{
    name: string;
    modelValue: string;
    disabled?: boolean;
    button?: boolean;
    size?: "mini" | "small" | "medium";
  }>(),
  {
    button: undefined,
    disabled: undefined
  }
);
const emits = defineEmits(["update:modelValue"]);

const value = ref(props.modelValue);
watch(value, (newValue) => {
  emits("update:modelValue", newValue);
});
provide(radioConfig.name, props.name);
provide(radioConfig.modelValue, value);
provide(radioConfig.size, props.size ?? "small");
provide(radioConfig.button, props.button ?? false);
provide(radioConfig.disabled, props.disabled ?? false);
</script>
<style lang="less">
.m-radio-group {
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
