<template>
  <div
    class="numberAnimationScroll"
    ref="numberAnimationScrollRef"
    :style="{
      ['--m-number-animation-duration']: duration + 'ms'
    }"
  >
    <span>0</span>
    <span>1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>
    <span>5</span>
    <span>6</span>
    <span>7</span>
    <span>8</span>
    <span>9</span>
  </div>
</template>

<script lang="ts" setup name="numberAnimationScroll">
/*
 * @Author: bughou
 * @Date: 2022-05-29 19:24:10
 * @Description: 创建一个numberAnimationScroll组件
 */
// 从下载的组件中导入函数
import { defineProps, ref, watch, onMounted, nextTick } from "vue";
const props = withDefaults(
  defineProps<{
    value: number;
    duration: number;
  }>(),
  {}
);

const numberAnimationScrollRef = ref<HTMLElement>();
onMounted(() => {
  watch(
    () => props.value,
    (newValue) => {
      setTimeout(() => {
        numberAnimationScrollRef.value.style.transform =
          "translateY(-" + newValue + "0%)";
      }, 100);
    },
    {
      immediate: true
    }
  );
});
</script>
<style scoped lang="less">
.numberAnimationScroll {
  margin-top: 0;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: calc(10 * 100%);
  transition: transform var(--m-number-animation-duration);
  transform: translateY(0%);
}
</style>
