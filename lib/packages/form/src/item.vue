<template>
  <div class="m-form-item" :class="'m-form-item-' + placement">
    <div class="m-form-item-label">
      <slot name="label">{{ label }}</slot>
    </div>
    <div class="m-form-item-body">
      <slot></slot>
      <div v-if="showTooltip">
        <slot name="success"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="m-form-item">
/*
 * @Author: bughou
 * @Date: 2022-08-09 16:34:31
 * @Description: 创建一个m-form-item组件
 */
// 从下载的组件中导入函数
import {
  ref,
  reactive,
  defineEmits,
  defineExpose,
  defineProps,
  watch
} from "vue";
const props = withDefaults(
  defineProps<{
    placement?: "left" | "right" | "top" | "bottom";
    verify?: string | RegExp;
    verifyFn?: (value: string) => boolean;
    showTooltip?: boolean;
    verifyTigger?: "lazy" | "change";
    label: string;
    modelValue: string;
    required?: boolean;
  }>(),
  {}
);
const isCorrect = ref<boolean>(false);
if (props.showTooltip) {
  watch(
    () => props.modelValue,
    (newValue) => {
      if (props.verifyFn) {
        isCorrect.value = props.verifyFn(newValue);
      } else {
        if (props.verify) {
          if (props.verify instanceof RegExp) {
            isCorrect.value = props.verify.test(newValue);
          } else {
            isCorrect.value = newValue === props.verify;
          }
        }
      }
    }
  );
}
</script>
<style scoped lang="less">
.m-form-item {
  width: 100%;
  position: relative;
  display: flex;
  gap: 10%;
  justify-content: center;
  align-items: center;
  .m-form-item-body {
    max-width: 90%;
    flex: 1;
    position: absolute;

  }
  .m-form-item-label {
    width: 20%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.m-form-item-top {
  display: block;
  .m-form-item-label {
    padding: 10px 0;
  }
}

.m-form-item-right {
  flex-direction: row-reverse;
  .m-form-item-label {
    padding: 10px 0;
  }
}
</style>
