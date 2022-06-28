<template>
  <div class="card">
    <cpn-header-vue
      title="dropdown"
      name="下拉菜单"
      description="将两个内容分隔开来，为什么就不能在一起了"
    >
    </cpn-header-vue>
    <div class="layout">
      <trigger-vue></trigger-vue>
      <icon-vue></icon-vue>
      <direction-vue></direction-vue>
      <collapse-vue></collapse-vue>
    </div>
  </div>
</template>

<script lang="ts" setup name="card">
/*
 * @Author: bughou
 * @Date: 2022-05-09 18:42:15
 * @Description: 创建一个card组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import triggerVue from "./cpn/trigger.vue";
import iconVue from "./cpn/icon.vue";
import directionVue from "./cpn/direction.vue";
import collapseVue from "./cpn/collapse.vue";
</script>
