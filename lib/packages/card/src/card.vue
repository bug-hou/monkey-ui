<template>
  <div
    class="m-card"
    :class="[shadow && 'active']"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    @click="handleClick"
  >
    <aside class="m-card-common m-card-aside">
      <slot name="cover"></slot>
    </aside>
    <header class="m-card-common m-card-header">
      <slot name="header"></slot>
    </header>
    <main class="m-card-common">
      <slot></slot>
    </main>
    <footer class="m-card-common m-card-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts" setup name="m-card">
/*
 * @Author: bughou
 * @Date: 2022-05-11 16:17:12
 * @Description: 创建一个m-card组件
 */
// 从下载的组件中导入函数
import { defineProps, withDefaults, ref } from "vue";
import type { CardSize, CardType } from "./card";
const props = withDefaults(
  defineProps<{
    size?: CardSize;
    type?: CardType;
  }>(),
  {}
);
const shadow = ref<boolean>(props.type === "always" ? true : false);
function handleEnter() {
  if (props.type === "hover") {
    shadow.value = true;
  }
}
function handleLeave() {
  if (props.type === "hover") {
    shadow.value = false;
  }
}
function handleClick() {
  if (props.type === "click") {
    shadow.value = !shadow.value;
  }
}
</script>
<style scoped lang="less">
.m-card {
  border: 1px solid rgb(239, 239, 245);
  background: white;
  border-radius: 10px;
  transition: all 0.5 linear;
  font-size: 16px;
  cursor: pointer;
  .m-card-common {
    margin-top: 10px;
    padding: 5px 25px;
    &:empty {
      padding: 0;
    }
  }
  .m-card-aside {
    img {
      width: 100%;
    }
  }
  .m-card-header {
    font-size: 20px;
    font-weight: bold;
  }
  .m-card-footer {
    background: #f5f7fa;
  }
  &.active {
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.08),
      0 3px 6px 0 rgba(0, 0, 0, 0.06), 0 5px 12px 4px rgba(0, 0, 0, 0.04),
      0 2px 4px 0 rgb(54 58 80 / 32%);
  }
}
</style>

