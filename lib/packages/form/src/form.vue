<template>
  <div class="m-form">
    <div class="m-form-header">
      <slot name="header"></slot>
    </div>
    <div class="m-form-body" :class="'m-form-body-' + direction">
      <slot></slot>
    </div>
    <div class="m-form-footer">
      <div class="m-form-submit" @click="submitHandle">
        <slot name="submit"></slot>
      </div>
      <div class="m-form-reset" @click="resetHandle">
        <slot name="reset"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="m-form">
/*
 * @Author: bughou
 * @Date: 2022-08-09 16:31:31
 * @Description: 创建一个m-form组件
 */
// 从下载的组件中导入函数
import { defineProps, provide } from "vue";
import { formMitt } from "../../../utils";
const props = withDefaults(
  defineProps<{
    direction?: "vertical" | "horizontal";
    placement?: "left" | "right" | "top" | "bottom";
    labelWidth?: "auto" | number;
    modelValue: Object;
  }>(),
  {
    direction: "vertical",
    placement: "left",
    labelWidth: "auto"
  }
);
const emits = defineEmits(["update:modelValue"]);
const { placement, labelWidth } = props;
let result = {};

providesHandle(["placement", "labelWidth"], [placement, labelWidth]);

function resetHandle() {
  formMitt.emit("reset");
}

function submitHandle() {
  formMitt.emit("submit");
}
let timer;
formMitt.on("commit", (formItem: any) => {
  result[formItem.name] = formItem.value;
  if (timer) {
    clearInterval(timer);
  }
  timer = setTimeout(() => {
    emits("update:modelValue", result);
    result = { ...result };
  }, 100);
});

function providesHandle(names: string[], values: any[]) {
  if (names.length !== values.length) {
    return;
  }
  for (let i = 0; i < names.length; i++) {
    provide(names[i], values[i]);
  }
}
</script>
<style scoped lang="less">
.m-form {
  padding: 10px;
  .m-form-body-horizontal {
    display: flex;
  }
  .m-form-footer {
    width: 100%;
  }
}
</style>
