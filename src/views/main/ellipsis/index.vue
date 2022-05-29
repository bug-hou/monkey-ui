<template>
  <div class="gradient">
    <cpn-header-vue
      title="gradient"
      name="渐变"
      description="你可以将文字变得五彩缤纷"
    >
    </cpn-header-vue>
    <div class="layout">
      <width-vue></width-vue>
      <clamp-vue></clamp-vue>
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
import clampVue from "./cpn/clamp.vue";
import widthVue from "./cpn/width.vue";
</script>
<style scoped lang="less"></style>
