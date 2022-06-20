<template>
  <div class="m-dropdown">
    <m-tooltip-vue :tooltip-text="options" arrow direction="right">
      <slot></slot>
      <template #tooltip="{ value }">
        <div v-if="((value as any).children)">
          <m-dropdown-item-vue
            :options="(value as any).children"
            :content="value[labelName]"
          ></m-dropdown-item-vue>
        </div>
        <div v-else>
          <p class="m-dropdown-label">{{ value[labelName] }}</p>
        </div>
      </template>
    </m-tooltip-vue>
  </div>
</template>

<script lang="ts" setup name="m-dropdown">
/*
 * @Author: bughou
 * @Date: 2022-06-19 14:18:37
 * @Description: 创建一个m-dropdown组件
 */
// 从下载的组件中导入函数
import { defineProps } from "vue";
import mTooltipVue from "../../tooltip/src/tooltip.vue";
import mDropdownItemVue from "./dropdownItem.vue";
const props = withDefaults(
  defineProps<{
    options: any[];
    direction?: "left" | "right" | "top" | "bottom";
    mode?: "click" | "hover";
    labelName?: string;
    valueName?: string;
  }>(),
  {
    labelName: "label",
    valueName: "value",
    mode: "click",
    direction: "bottom"
  }
);
</script>
<style scoped lang="less">
.m-dropdown {
  .m-dropdown-label {
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      background-color: #6666;
    }
  }
}
</style>
