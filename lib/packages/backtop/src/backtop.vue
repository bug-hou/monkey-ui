<!-- bgBackTop -->
<template>
  <div
    class="mBackTop"
    :class="['backTop-' + size, showBackTop && 'back-show', circle && 'circle']"
    :style="[{ right: right + 'px' }, { bottom: bottom + 'px' }]"
    ref="scrollRef"
    @click="clickHandle"
  >
    <slot> Top </slot>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import {
  onMounted,
  onUnmounted,
  ref,
  watchEffect,
  withDefaults,
  defineProps
} from "vue";

// 自定义方法引入
import { useScroll } from "../../../utils";
// 自定义组件引入
const props = withDefaults(
  defineProps<{
    offset?: number;
    right?: number;
    bottom?: number;
    size?: "mini" | "small" | "medium";
    circle?: boolean;
  }>(),
  {
    offset: 200,
    right: 50,
    bottom: 50,
    size: "small",
    circle: false
  }
);
let callback: Function;
const scrollRef = ref<HTMLElement>();
const showBackTop = ref(false);

let scrollHandle = () => {};

function clickHandle() {
  scrollHandle();
}

onMounted(() => {
  const result = useScroll(scrollRef.value);
  if (!result) {
    return;
  }
  const { scrollPos, scrollTop } = result;
  scrollHandle = scrollTop;
  const scrollInfo = scrollPos();
  callback = scrollInfo.callback;
  const scrollY = scrollInfo.scroll;

  watchEffect(() => {
    if (scrollY.value >= props.offset) {
      showBackTop.value = true;
    } else {
      showBackTop.value = false;
    }
  });
});

onUnmounted(() => {
  callback();
});
</script>
<style scoped lang="less">
.mBackTop {
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 50px;
  letter-spacing: 2px;
  background-color: white;
  color: rgb(51, 54, 57);
  padding: 5px 25px;
  z-index: 1000;
  position: fixed;
  opacity: 0;
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: center;
  align-items: center;
  &.circle {
    padding: 0;
    border-radius: 50%;
    font-weight: bold;
  }
  &:hover {
    box-shadow: 0 2px 12px 0px rgba(0, 0, 0, 0.18);
    cursor: pointer;
  }
  &.back-show {
    opacity: 1;
  }
}
.backTop-mini {
  &.circle {
    width: 30px;
    height: 30px;
  }
  font-size: 20px;
}
.backTop-small {
  &.circle {
    width: 40px;
    height: 40px;
  }
  font-size: 25px;
}
.backTop-medium {
  &.circle {
    width: 50px;
    height: 50px;
  }
  font-size: 30px;
}
</style>
