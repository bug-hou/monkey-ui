<template>
  <m-input
    v-model="value"
    :list="listOptions"
    v-bind="$attrs"
    clear
    @li-click="clickHandle"
    @list-click="clickHandle"
  >
    <template #list="{ value }">
      <slot :value="value"> {{ value }}</slot>
    </template>
  </m-input>
</template>

<script lang="ts" setup name="autoComplete">
/*
 * @Author: bughou
 * @Date: 2022-06-14 19:16:48
 * @Description: 创建一个autoComplete组件
 */
// 从下载的组件中导入函数
import { ref, defineEmits, defineProps, watch } from "vue";
import mInput from "../../input/src/input.vue";

const props = withDefaults(
  defineProps<{
    prefix?: any[];
    suffix?: any[];
    modelValue: string;
  }>(),
  {
    prefix: [],
    suffix: []
  }
);

const emits = defineEmits(["update:modelValue"]);
const value = ref(props.modelValue);
const listOptions = ref<string[]>([]);

watch(value, (newValue) => {
  if (newValue) {
    listOptions.value = [];
    const len = Math.max(props.prefix.length, props.suffix.length);
    for (let i = 0; i < len; i++) {
      const prefix = props.prefix[i] ?? "";
      const suffix = props.suffix[i] ?? "";
      listOptions.value.push(prefix + newValue + suffix);
    }
  } else {
    listOptions.value = [];
  }
});

function clickHandle(value: string) {
  emits("update:modelValue", value);
}
</script>
<style scoped lang="less">
.autoComplete {
}
</style>
