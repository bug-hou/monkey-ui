<template>
  <div class="m-tab-pane">
    <transition name="verticalto" mode="out-in" appear>
      <div v-if="activeTabName === name">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup name="m-tab-pane">
/*
 * @Author: bughou
 * @Date: 2022-08-05 19:30:11
 * @Description: 创建一个m-tab-pane组件
 */
// 从下载的组件中导入函数
import { ref, reactive, defineEmits, defineExpose, defineProps } from "vue";
import { useInject } from "../../../hooks";
const props = withDefaults(
  defineProps<{
    name: string;
    disabled?: boolean;
    closable?: boolean;
  }>(),
  {
    disabled: false,
    closable: false
  }
);

const [addTabName, activeTabName] = useInjects(
  ["addTabName", "activeTabName"],
  [(str: string, options?: any) => {}, (str: string) => {}]
);

function useInjects(names: string[], defaultValue: any[]) {
  const result: any[] = [];
  names.forEach((item, index) => {
    result.push(useInject(undefined, item, defaultValue[index]));
  });
  return result;
}

addTabName(props.name, {
  closable: props.closable,
  disabled: props.disabled
});
</script>
<style scoped lang="less">
.m-tab-pane {
  width: 100%;
  height: 100%;
}

// .verticalto-enter-active,
// .verticalto-leave-active {
//   transition: all 0.3s;
//   position: absolute;
// }
// .verticalto-enter-to,
// .verticalto-leave-from {
//   opacity: 1;
// }
// .verticalto-enter-from,
// .verticalto-leave-to {
//   opacity: 0;
// }
</style>
