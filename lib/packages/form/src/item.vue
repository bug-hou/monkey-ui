<template>
  <div
    class="m-form-item"
    :class="['m-form-item-' + placement, disabled && 'm-form-item-disabled']"
    :style="[
      { ['--m-form-item-label-width' as any]: labelWidth + 'px' },
      { ['--m-form-item-label-dir' as any ] : labelAlign }
    ]"
  >
    <div class="m-form-item-label" v-if="showLabel">
      <slot name="label">{{ label }}</slot>
      <span v-if="required" style="color: red"> * </span>
    </div>
    <div class="m-form-item-body">
      <slot>
        <m-input
          v-model="value"
          :color="showFeedback && !isCorrect ? color : ''"
          @blur="blurHandle"
          :placeholder="placeholder"
          v-bind="$attrs"
          radius="1px"
          :disabled="disabled"
        ></m-input>
      </slot>
      <div v-if="showFeedback && !isCorrect" class="m-form-item-tooltip">
        <slot name="tooltip" :value="errorContent">
          <span>
            {{ errorContent }}
          </span>
        </slot>
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
import mInput from "../../input/src/input.vue";
import {
  ref,
  reactive,
  defineEmits,
  defineExpose,
  defineProps,
  watch,
  nextTick,
  unref
} from "vue";
import { useInject } from "../../../hooks";
import { formMitt } from "../../../utils";
interface Irule {
  rule: string | RegExp;
  content: string;
  [key: string]: any;
}
interface IRuleResult {
  value: boolean;
  content?: string;
}
const props = withDefaults(
  defineProps<{
    placement?: "left" | "top" | "right";
    labelWidth?: "auto" | number;
    labelAlign?: "left" | "right";
    showLabel?: boolean;
    rule?: Irule[];
    ruleFn?: (value: string) => IRuleResult;
    ruleTigger?: "lazy" | "input";
    showFeedback?: boolean;
    label?: string;
    modelValue?: string;
    required?: boolean;
    placeholder?: string;
    color?: string;
    name?: string;
    disabled?: boolean;
  }>(),
  {
    required: false,
    ruleTigger: "input",
    color: "#f56c6c",
    showFeedback: true,
    showLabel: true,
    name: ""
  }
);
const emits = defineEmits(["update:modelValue"]);

const placement = useInject(props.placement, "placement", "left");
const labelWidth = useInject(props.labelWidth, "labelWidth", "auto");
const labelAlign = useInject(props.labelAlign, "labelAlign", "left");
const formObject = useInject(props.modelValue, "formObject", "");

const isCorrect = ref<boolean>(true);
const errorContent = ref("");
const value = ref(
  typeof formObject === "object" ? formObject[props.name] : formObject
);
watch(value, (newValue) => {
  emits("update:modelValue", newValue);
  formMitt.emit("commit", { name: props.name, value: newValue });
  if (props.ruleTigger === "input") {
    processRegistyHandle(newValue);
  }
});

function blurHandle() {
  if (props.ruleTigger === "lazy") {
    processRegistyHandle(value.value);
  }
}

function processRegistyHandle(newValue: string) {
  if (props.showFeedback) {
    if (props.ruleFn) {
      const { value = true, content } = props.ruleFn(newValue);
      isCorrect.value = value;
      errorContent.value = content ?? "";
    } else {
      if (props.rule) {
        for (const item of props.rule) {
          if (item.rule instanceof RegExp) {
            isCorrect.value = item.rule.test(newValue);
          } else {
            isCorrect.value = newValue === item.rule;
          }
          if (!isCorrect.value) {
            errorContent.value = item.content;
            break;
          }
        }
      }
    }
  }
}
formMitt.on("reset", () => {
  value.value = "";
  nextTick(() => {
    isCorrect.value = true;
  });
});

formMitt.on("submit", () => {
  processRegistyHandle(value.value);
});
</script>
<style scoped lang="less">
.m-form-item {
  width: 100%;
  position: relative;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  padding-bottom: 20px;
  &.m-form-item-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .m-form-item-body {
    max-width: 90%;
    flex: 1;
    position: relative;
    width: 100%;
    .m-form-item-tooltip {
      position: absolute;
      left: 0;
      bottom: -18px;
      font-size: 12px;
      color: red;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .m-form-item-label {
    width: 20%;
    width: var(--m-form-item-label-width);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
  }
}
.m-form-item-top {
  display: block;

  .m-form-item-label {
    width: 100%;
    padding: 10px 0;
  }
}
.m-form-item-right,
.m-form-item-left {
  text-align: var(--m-form-item-label-dir);
}
.m-form-item-right {
  flex-direction: row-reverse;
  .m-form-item-label {
    padding: 10px 0;
  }
}
</style>
