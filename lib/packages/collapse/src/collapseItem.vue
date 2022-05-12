<!-- bgCollpaseTitle -->
<template>
  <div
    :class="['bgCollpaseItem', extension && 'extension']"
    :style="[{ ['--m-collapse-height']: height + 'px' }]"
  >
    <collapse-title-vue
      :title="title"
      :isExtension="extension"
      @titleClick="changeExtension"
    >
      <slot name="title"></slot>
    </collapse-title-vue>
    <p class="content" ref="contentDiv">
      <slot>
        {{ content }}
      </slot>
    </p>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import {
  inject,
  nextTick,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref,
  watch
} from "vue";

// 自定义方法引入
import { collapseMitt } from "../../../utils";

// 自定义组件引入
import collapseTitleVue from "./collapseTitle.vue";

const props = withDefaults(
  defineProps<{
    index: any;
    isExtension?: boolean;
    content?: string;
    title?: string;
  }>(),
  {
    isExtension: false
  }
);

const emits = defineEmits(["open", "close"]);

const height = ref(0);
const contentDiv = ref<HTMLElement>();
const extension = ref(props.isExtension);
const accordion = inject("accordion", false);
const changeExtension = (value) => {
  if (value) {
    emits("open", props.index);
    collapseMitt.emit("open", props.index);
  } else {
    emits("close", props.index);
    collapseMitt.emit("close", props.index);
  }
  if (accordion) {
    collapseMitt.emit("close");
  }
  nextTick(() => {
    extension.value = value;
  });
};
if (accordion) {
  const close = () => {
    extension.value = false;
  };
  collapseMitt.on("close", close);
  onUnmounted(() => {
    collapseMitt.off("*");
  });
  onDeactivated(() => {
    collapseMitt.off("*");
  });
}
watch(
  () => props.isExtension,
  (newValue) => {
    if (newValue) {
      emits("open", props.index);
      collapseMitt.emit("open", props.index);
    } else {
      emits("close", props.index);
      collapseMitt.emit("close", props.index);
    }
    extension.value = newValue;
  }
);
onMounted(() => {
  height.value = parseFloat(getComputedStyle(contentDiv.value).height) + 40;
});
</script>
<style scoped lang="less">
.bgCollpaseItem {
  width: 100%;
  border-bottom: 1px solid var(--border-color-collapse);
  transition: height 1s;
  height: 40px;
  overflow: hidden;
  &.extension {
    height: var(--m-collapse-height);
    width: 100%;
  }
  .content {
    width: 100%;
    font-size: 14px;
    padding-bottom: 20px;
  }
}
</style>
