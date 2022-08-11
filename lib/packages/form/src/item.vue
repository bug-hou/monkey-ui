<template>
  <div
    class="m-form-item"
    :class="'m-form-item-' + placement"
    :style="{ ['--m-form-item-label-width' as any]: labelWidth + 'px' }"
  >
    <div class="m-form-item-label" v-if="label">
      <slot name="label">{{ label }}</slot>
      <span v-if="required" style="color: red"> * </span>
    </div>
    <div class="m-form-item-body">
      <slot>
        <m-input
          v-model="value"
          :color="showTooltip && !isCorrect ? color : ''"
          @blur="blurHandle"
          :placeholder="placeholder"
          v-bind="$attrs"
        ></m-input>
      </slot>
      <div v-if="showTooltip && !isCorrect" class="m-form-item-tooltip">
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
  watch
} from "vue";
import { useInject } from "../../../hooks";
import { formMitt } from "../../../utils";

interface IVerify {
  rule: string | RegExp;
  content: string;
  [key: string]: any;
}
const props = withDefaults(
  defineProps<{
    placement?: "left" | "right" | "top" | "bottom";
    labelWidth?: "auto" | number;
    verify?: IVerify[];
    verifyFn?: (value: string) => boolean;
    verifyTigger?: "lazy" | "input";
    showTooltip?: boolean;
    label?: string;
    modelValue?: string;
    required?: boolean;
    placeholder?: string;
    color?: string;
    name?: string;
  }>(),
  {
    required: false,
    verifyTigger: "input",
    color: "#f56c6c"
  }
);
const placement = useInject(props.placement, "placement", "left");
const labelWidth = useInject(props.labelWidth, "labelWidth", "auto");
const emits = defineEmits(["update:modelValue"]);
const isCorrect = ref<boolean>(false);
const errorContent = ref("");
let commitValue = "";

const value = ref(props.modelValue ?? "");
watch(value, (newValue) => {
  emits("update:modelValue", newValue);
  if (props.verifyTigger === "input") {
    processRegistyHandle(newValue);
  }
});

function blurHandle() {
  if (props.verifyTigger === "lazy") {
    processRegistyHandle(value.value);
  }
}

function processRegistyHandle(newValue: string) {
  if (props.showTooltip) {
    if (props.verifyFn) {
      isCorrect.value = props.verifyFn(newValue);
    } else {
      if (props.verify) {
        for (const item of props.verify) {
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
});

formMitt.on("submit", () => {
  if (commitValue !== value.value) {
    formMitt.emit("commit", { name: props.name, value: value.value });
    commitValue = value.value;
  }
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
  padding: 10px 0;
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
      padding-left: 1em;
    }
  }
  .m-form-item-label {
    width: 20%;
    width: var(--m-form-item-label-width);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.m-form-item-top {
  display: block;

  .m-form-item-label {
    width: 100%;
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
