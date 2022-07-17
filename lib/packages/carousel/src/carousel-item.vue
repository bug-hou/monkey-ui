<template>
  <transition
    :name="
      animationMap[mode] +
      direction +
      (attachment && (mode === 'vartical' || mode === 'horization')
        ? 'attachment'
        : '')
    "
    mode="out-in"
    appear
  >
    <div
      class="carouselItem"
      :class="[
        mode === 'slider' && 'carousel-item-slider',
        mode === 'slider' && key === currentIndex && 'carousel-item-active'
      ]"
      ref="carouselItemRef"
      v-if="mode === 'slider' || key === undefined || key === currentIndex"
      :style="{ ['--carousel-duration']: duration + 'ms' }"
      @click="clickHandle"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts" setup name="carouselItem">
/*
 * @Author: bughou
 * @Date: 2022-07-11 16:00:12
 * @Description: 创建一个carouselItem组件
 */
// 从下载的组件中导入函数
import { ref, defineProps, onMounted, nextTick, watch } from "vue";
import { useInject } from "../../../hooks";
const props = withDefaults(
  defineProps<{
    order?: number;
  }>(),
  {}
);

const animationMap = {
  vertical: "vertical",
  horization: "horization",
  attachment: "attachment",
  scale: "scale"
};

const carouselItemRef = ref<HTMLElement>();

const key = ref<number>();

const currentIndex = useInject(undefined, "currentIndex", 0);
const direction = useInject(undefined, "direction", "to");
const mode = useInject(undefined, "mode", "horization");
const duration = useInject(undefined, "duration", 1000);
const attachment = useInject(undefined, "attachment", false);
const itemClickHandle = useInject(
  undefined,
  "itemClickHandle",
  (index: number) => {}
);

function clickHandle() {
  itemClickHandle(key.value ?? 0);
}

onMounted(() => {
  const parent = carouselItemRef.value?.parentElement;
  const children = parent?.children ?? [];
  const len = children.length;
  for (let i = 0; i < len; i++) {
    const element = children[i];
    if (element === carouselItemRef.value) {
      key.value = props.order ?? i;
    }
  }
});
</script>
<style scoped lang="less">
.carouselItem {
  flex: 0 0;
  width: 100%;
  height: 100%;
  position: absolute;
  transform-origin: 50% 50%;
  transition: all var(--carousel-duration);
  // &.carousel-item-slider {
  //   position: relative;
  //   flex: 1;
  //   overflow: hidden;
  //   display: flex;
  //   justify-content: center;
  // }
  // &.carousel-item-active {
  //   width: 100%;
  //   flex: 3;
  // }
}
.verticalto-enter-active,
.verticalto-leave-active {
  top: 0%;
}
.verticalto-enter-to,
.verticaltoattachment-enter-to {
  right: 0;
}
.verticalto-enter-from,
.verticaltoattachment-enter-from {
  right: 100%;
}
.verticalto-leave-to {
  right: -100%;
}
.verticalto-leave-from {
  right: 0;
}

.verticalfrom-enter-active,
.verticalfrom-leave-active {
  top: 0%;
}
.verticalfromattachment-enter-active {
  z-index: 10;
}
.verticalfrom-enter-to,
.verticalfromattachment-enter-to {
  left: 0;
}
.verticalfrom-enter-from,
.verticalfromattachment-enter-from {
  left: 100%;
}
.verticalfrom-leave-to {
  left: -100%;
}
.verticalfrom-leave-from {
  left: 0;
}

.horizationto-enter-active,
.horizationto-leave-active {
  left: 0%;
}
.horizationto-enter-to {
  bottom: 0;
}
.horizationto-enter-from {
  bottom: 100%;
}
.horizationto-leave-to {
  bottom: -100%;
}
.horizationto-leave-from {
  bottom: 0;
}

.horizationfrom-enter-active,
.horizationfrom-leave-active {
  left: 0%;
}
.horizationfrom-enter-to {
  top: 0;
}
.horizationfrom-enter-from {
  top: 100%;
}
.horizationfrom-leave-to {
  top: -100%;
}
.horizationfrom-leave-from {
  top: 0;
}

.scaleto-leave-from,
.scalefrom-leave-from,
.scaleto-enter-to,
.scalefrom-enter-to {
  transform: scale(1);
  opacity: 1;
}
.scaleto-leave-to,
.scalefrom-leave-to,
.scalefrom-enter-from,
.scaleto-enter-from {
  transform: scale(0.7);
  opacity: 0;
}
</style>
