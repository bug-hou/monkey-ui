<template>
  <div class="gradient">
    <cpn-header-vue
      title="gradient"
      name="渐变"
      description="你可以将文字变得五彩缤纷"
    >
    </cpn-header-vue>
    <div class="layout">
      <color-vue></color-vue>
      <deg-vue></deg-vue>
    </div>
  </div>
</template>

<script lang="ts" setup name="gradient">
/*
 * @Author: bughou
 * @Date: 2022-05-09 18:42:15
 * @Description: 创建一个gradient组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import colorVue from "./cpn/color.vue";
import degVue from "./cpn/deg.vue";
</script>
<style scoped lang="less"></style>
