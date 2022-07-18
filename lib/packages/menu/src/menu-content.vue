<template>
  <div class="m-menu-content">
    <div class="m-menu-content-title">
      <m-icon v-if="options[iconName]" :name="options[iconName]"></m-icon>
      <span>{{ options[lableName] }}</span>
      <m-icon name="m-right"></m-icon>
    </div>
    <div v-if="level === 1 && collapsed">
      <ul v-for="item in options.children" :key="item[valueName]">
        <component
          :is="item.children ? menuSubItemVue : menuItemVue"
          :level="level"
          :options="item"
        ></component>
      </ul>
    </div>
    <div v-else>
      <m-tooltip></m-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup name="m-menu-content">
/*
 * @Author: bughou
 * @Date: 2022-07-18 20:43:06
 * @Description: 创建一个m-menu-content组件
 */
// 从下载的组件中导入函数
import mTooltip from "../../tooltip/src/tooltip.vue";
import mIcon from "../../icon/src/icon.vue";
import menuItemVue from "./menu-item.vue";
import menuSubItemVue from "./menu-sub-item.vue";
import { ref, reactive, defineEmits, defineExpose, defineProps } from "vue";
import { useInject } from "../../../hooks";
const props = withDefaults(
  defineProps<{
    options: any;
    level: number;
  }>(),
  {}
);

const lableName = useInject(undefined, "labelName", "label");
const valueName = useInject(undefined, "valueName", "value");
const iconName = useInject(undefined, "iconName", "icon");

const collapsed = useInject(undefined, "collapsed", ref(false));
</script>
<style scoped lang="less">
.m-menu-content {
}
</style>
