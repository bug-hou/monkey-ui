<template>
  <menu-content-vue
    :options="options"
    :level="level + 1"
    ref="menuContentRef"
    @checkValue="checkValueHandle"
  ></menu-content-vue>
</template>

<script lang="ts" setup name="m-menu-sub-item">
/*
 * @Author: bughou
 * @Date: 2022-07-18 21:31:13
 * @Description: 创建一个m-menu-sub-item组件
 */
// 从下载的组件中导入函数
import menuContentVue from "./menu-content.vue";
import { ref, onMounted, defineProps } from "vue";
import { useInject } from "../../../hooks";
const props = withDefaults(
  defineProps<{
    options: any;
    level: number;
  }>(),
  {}
);
const emits = defineEmits(["checkValue"]);
const labelName = useInject(undefined, "labelName", "label");
const valueName = useInject(undefined, "valueName", "value");
function checkValueHandle(values: string[], level: number) {
  values.unshift(props.options[valueName]);
  emits("checkValue", values, level);
}
</script>
