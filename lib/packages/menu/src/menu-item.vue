<template>
  <div class="m-menu-item">
    <m-icon v-if="options[iconName]" :name="options[iconName]"></m-icon>
    <span>{{ options[lableName] }}</span>
  </div>
</template>

<script lang="ts" setup name="m-menu-item">
/*
 * @Author: bughou
 * @Date: 2022-07-18 19:49:43
 * @Description: 创建一个m-menu-item组件
 */
// 从下载的组件中导入函数
import mIcon from "../../icon/src/icon.vue";
import { ref, reactive, defineEmits, defineExpose, defineProps } from "vue";
import { useInject } from "../../../hooks";
const props = withDefaults(
  defineProps<{
    options: any;
    level: number;
  }>(),
  {}
);

const lableName = useInject(undefined, "labelName", "label");
const valueName = useInject(undefined, "valueName", "value");
const iconName = useInject(undefined, "iconName", "icon");
</script>
<style scoped lang="less">
.m-menu-item {
  width: 200px;
  height: 40px;
  transition: width 0.5s;
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
