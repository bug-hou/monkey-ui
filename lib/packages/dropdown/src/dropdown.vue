<template>
  <div class="m-dropdown">
    <m-tooltip-vue>
      <slot></slot>
      <template #tooltip="{ value }">
        <div v-if="((value as any).children)">
          <m-tooltip-vue>
            <p>{{ value[labelName] }}</p>
          </m-tooltip-vue>
        </div>
        <div v-else>
          <p>{{ value[labelName] }}</p>
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
import { ref, reactive, defineEmits, defineExpose, defineProps } from "vue";
import mTooltipVue from "../../tooltip/src/tooltip.vue";
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
}
</style>
