<template>
  <div
    class="numberAnimationScroll"
    :style="{ ['--m-number-animation-scroll-value']: '-' + value + '0%' }"
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
import { defineProps } from "vue";
withDefaults(
  defineProps<{
    value: number;
  }>(),
  {}
);
</script>
<style scoped lang="less">
.numberAnimationScroll {
  margin-top: 0;
  overflow: hidden;
  height: calc(10 * 100%);
  transition: transform 2s;
  animation: numberScroll 2s linear forwards;
  @keyframes numberScroll {
    from {
      transform: translateY(0%);
    }
    to {
      transform: translateY(var(--m-number-animation-scroll-value));
    }
  }
  span {
    display: block;
  }
}
</style>
