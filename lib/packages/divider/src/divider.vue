<template>
  <div
    class="m-divider"
    :class="vertical && 'm-divider-vertical'"
    :style="[
      { ['--m-divider-color']: color },
      { ['--m-divider-shape']: shape },
      { ['--m-divider-width']: width }
    ]"
  >
    <p
      class="m-divider-common"
      :class="[titlePlacement === 'left' && 'm-divider-left']"
    ></p>
    <p class="m-divider-slot"><slot></slot></p>
    <p
      class="m-divider-common"
      :class="[titlePlacement === 'right' && 'm-divider-right']"
    ></p>
  </div>
</template>

<script lang="ts" setup name="divider">
/*
 * @Author: bughou
 * @Date: 2022-05-11 19:44:52
 * @Description: 创建一个divider组件
 */
// 从下载的组件中导入函数
import { defineProps, withDefaults } from "vue";
const props = withDefaults(
  defineProps<{
    vertical?: boolean;
    shape?: "solid" | "dashed" | "dotted";
    color?: string;
    titlePlacement?: "left" | "center" | "right";
    width?: string;
  }>(),
  {
    color: "rgb(229, 229, 225)",
    shape: "solid",
    titlePlacement: "center",
    width: "1px"
  }
);
</script>
<style scoped lang="less">
.m-divider {
  display: inline-flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  color: rgb(31, 34, 37);
  justify-content: center;
  .m-divider-common {
    border-bottom: var(--m-divider-width) var(--m-divider-shape)
      var(--m-divider-color);
    width: 100%;
  }
  .m-divider-left,
  .m-divider-right {
    width: 30px;
  }
  .m-divider-slot {
    flex: 1;
    padding: 0 10px;
    white-space: nowrap;
  }
  .m-divider-slot:empty {
    padding: 0;
  }
}
.m-divider-vertical {
  height: 1em;
  margin: 0 8px;
  vertical-align: middle;
  width: auto;
  flex-direction: column;
  .m-divider-common {
    bottom: none;
    border-left: var(--m-divider-width) var(--m-divider-shape)
      var(--m-divider-color);
    height: 100%;
  }
  .m-divider-left,
  .m-divider-right {
    height: 30px;
  }
  .m-divider-slot {
    flex: 1;
    padding: 10px 1px;
  }
  .m-divider-slot:empty {
    padding: 0;
  }
}
</style>
