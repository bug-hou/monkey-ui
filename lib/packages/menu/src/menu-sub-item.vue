<template>
    <menu-content-vue
      :options="options"
      :level="level + 1"
      ref="menuContentRef"
    ></menu-content-vue>
</template>

<script lang="ts" setup name="m-menu-sub-item">
/*
 * @Author: bughou
 * @Date: 2022-07-18 21:31:13
 * @Description: 创建一个m-menu-sub-item组件
 */
// 从下载的组件中导入函数
import menuContentVue from "./menu-content.vue";
import { ref, onMounted, defineProps } from "vue";
const props = withDefaults(
  defineProps<{
    options: any;
    level: number;
  }>(),
  {}
);

</script>
