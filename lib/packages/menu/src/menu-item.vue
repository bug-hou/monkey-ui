<template>
  <div class="m-menu-item" ref="menuItemRef">
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
import {
  ref,
  reactive,
  defineEmits,
  defineExpose,
  defineProps,
  onMounted
} from "vue";
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
const itemHeight = useInject(undefined, "itemHeight", 40);
const menuItemRef = ref<HTMLElement>();
onMounted(() => {
  if (menuItemRef.value) {
    menuItemRef.value.dataset.height = String(itemHeight);
  }
});
</script>
<style scoped lang="less">
.m-menu-item {
  width: 100%;
  height: 40px;
  transition: width 0.5s;
  display: flex;
  gap: 10px;
  color: #666;
  align-items: center;
  cursor: pointer;
}
</style>
