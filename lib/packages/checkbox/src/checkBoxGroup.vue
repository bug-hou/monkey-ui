<!-- bgRadioGroup -->
<template>
  <div class="m-check-box-group">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { provide, ref, watch, withDefaults, defineProps } from "vue";

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
  if (props.modelValue.length <= props.max) {
    emits("update:modelValue", newValue);
  } else {
    isSelect.value = false;
  }
});
provide("isSelect", isSelect);
provide("name", props.name);
provide("modelValue", value);
provide("size", props.size ?? "small");
provide("button", props.button ?? false);
provide("border", props.border ?? false);
provide("selectColor", props.selectColor ?? "#409eff");
provide("disabled", props.disabled ?? false);
</script>
<style lang="less">
.m-check-box-group {
  label:first-child {
    .border {
      border-radius: 10px 0 0 10px;
    }
  }
  label:last-child {
    .border {
      border-radius: 0 10px 10px 0;
    }
  }
}
</style>
