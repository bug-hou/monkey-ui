<!-- bgCollapseItem -->
<template>
  <div class="bgCollapseTitle" @click="titleClick">
    <slot>
      <div class="slot">
        <m-icon
          name="m-right"
          :class="[extension && 'extension', 'common']"
        ></m-icon>
        <p>{{ title }}</p>
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { ref, watch, withDefaults, defineProps, defineEmits } from "vue";

const props = withDefaults(
  defineProps<{
    isExtension?: boolean;
    title?: string;
  }>(),
  {
    isExtension: false
  }
);

// 自定义方法引入
const emits = defineEmits(["titleClick"]);
const extension = ref(props.isExtension);
watch(
  () => props.isExtension,
  (newValue) => {
    extension.value = newValue;
  }
);
const titleClick = () => {
  extension.value = !extension.value;
  emits("titleClick", extension.value);
};
</script>
<style scoped lang="less">
.bgCollapseTitle {
  width: 100%;
  height: 40px;
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 1em;
  color: var(--font-color-collapse);
  .slot {
    display: flex;
    align-items: center;
    &:hover {
      color: var(--font-color-collapse-active);
      cursor: pointer;
    }
    .common {
      font-size: 16px;
      transform: rotate(0);
      margin-right: 10px;
      transition: all 0.5s;
    }
    .extension {
      transform: rotate(90deg);
    }
  }
}
</style>
