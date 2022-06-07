<template>
  <div class="avatar">
    <cpn-header-vue
      title="avatar"
      name="头像"
      description="你可能需要一个装照片的容器"
    >
    </cpn-header-vue>
    <div class="layout">
      <top-vue></top-vue>
      <bottom-vue></bottom-vue>
    </div>
  </div>
</template>

<script lang="ts" setup name="avatar">
/*
 * @Author: bughou
 * @Date: 2022-05-09 15:38:44
 * @Description: 创建一个avatar组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import topVue from "./cpn/top.vue";
import bottomVue from "./cpn/bottom.vue";
</script>

