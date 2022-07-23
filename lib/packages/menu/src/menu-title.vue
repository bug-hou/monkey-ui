<template>
  <div class="m-menu-title">
    <tooltip-vue
      :tooltip-text="title"
      effect="dark"
      v-if="collapse"
      class="m-menu-title-tooltip"
    >
      <m-icon v-if="icon" :name="icon" class="m-menu-title-icon"></m-icon>
    </tooltip-vue>
    <m-icon
      v-if="icon && !collapse"
      :name="icon"
      class="m-menu-title-icon"
    ></m-icon>

    <span v-if="!collapse">{{ title }}</span>
  </div>
</template>

<script lang="ts" setup name="m-menu-title">
/*
 * @Author: bughou
 * @Date: 2022-07-18 20:43:23
 * @Description: 创建一个m-menu-title组件
 */
// 从下载的组件中导入函数
import { ref, defineProps } from "vue";
import tooltipVue from "../../tooltip/src/tooltip.vue";
import { useInject } from "../../../hooks";
import mIcon from "../../icon/src/icon.vue";
const props = withDefaults(
  defineProps<{
    title?: string;
    icon?: string;
  }>(),
  {}
);

const collapse = useInject(undefined, "collapse", ref(false));
</script>
<style scoped lang="less">
.m-menu-title {
  cursor: pointer;
  width: 100%;
  height: var(--menu-item-height);
  transition: width 0.5s;
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  justify-content: center;
  white-space: no-wrap;
  .m-menu-title-tooltip{
    font-size: 14px;
  }
  .m-menu-title-icon {
    color: var(--menu-icon-color);
    font-size: var(--menu-icon-size);
  }
}
</style>
