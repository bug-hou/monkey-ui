<template>
  <div
    class="m-menu-item"
    ref="menuItemRef"
    @click="clickHandle"
    :class="showValue[level - 1] === options[valueName] && 'm-menu-item-active'"
  >
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
  watch,
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

const emits = defineEmits(["checkValue"]);

const lableName = useInject(undefined, "labelName", "label");
const valueName = useInject(undefined, "valueName", "value");
const iconName = useInject(undefined, "iconName", "icon");
const itemHeight = useInject(undefined, "itemHeight", 40);
const showValue = useInject(undefined, "showValue", []);
const navigator = useInject(undefined, "navigator", (path: string) => {});
const menuItemRef = ref<HTMLElement>();

function clickHandle() {
  if (props.options.disabled) {
    return;
  }
  if (props.options.path) {
    navigator(props.options.path);
  }
  emits("checkValue", [props.options[valueName]], props.level);
}
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
  padding: 0 20px;
  border-radius: 7px;
  &.m-menu-item-active {
    color: #4b9d5f;
    background-color: #ebf5ef;
  }
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
