<template>
  <transition :name="animationMap[mode] + direction" mode="out-in" appear>
    <div
      class="carouselItem"
      ref="carouselItemRef"
      v-if="key === undefined || key === currentIndex"
      :style="{ ['--carousel-duration']: duration + 'ms' }"
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
  attachment: "attachment"
};

const carouselItemRef = ref<HTMLElement>();

const key = ref<number>();

const currentIndex = useInject(undefined, "currentIndex", 0);
const direction = useInject(undefined, "direction", "to");
const mode = useInject(undefined, "mode", "horization");
const duration = useInject(undefined, "duration", 1000);

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
  transition: all var(--carousel-duration);
}
.verticalto-enter-active,
.verticalto-leave-active {
  top: 0%;
}
.verticalto-enter-to {
  right: 0;
}
.verticalto-enter-from {
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
.verticalfrom-enter-to {
  left: 0;
}
.verticalfrom-enter-from {
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
</style>