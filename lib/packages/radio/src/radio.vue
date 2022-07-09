<!-- bgRadio -->
<template>
  <m-check-box
    :isRadio="true"
    :name="name"
    :value="value"
    :size="size"
    :button="button"
    :disabled="disabled"
  >
    <slot></slot>
  </m-check-box>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { withDefaults, defineProps, watch } from "vue";

import { useInject } from "../../../hooks";

import { radioConfig } from "../../checkbox/config";

import mCheckBox from "../../checkbox/src/checkBox.vue";

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    name?: string;
    value: any;
    size?: string;
    button?: boolean;
  }>(),
  {
    button: undefined,
    disabled: undefined
  }
);

const name = useInject(props.name, radioConfig.name);
const size = useInject(props.size, radioConfig.size, "small");
const button = useInject(props.button, radioConfig.button, false);
const disabled = useInject(props.disabled, radioConfig.disabled, false);
</script>
