<template>
  <div class="backTop">
    <cpn-header-vue
      title="backTop"
      name="回到顶部"
      description="让你马上回到顶部看风景"
    >
    </cpn-header-vue>
    <base-vue></base-vue>
    <offset-vue></offset-vue>
    <circle-vue></circle-vue>
  </div>
</template>

<script lang="ts" setup name="backTop">
/*
 * @Author: bughou
 * @Date: 2022-05-09 18:42:15
 * @Description: 创建一个backTop组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import offsetVue from "./cpn/offset.vue";
import circleVue from "./cpn/circle.vue";
import baseVue from "./cpn/base.vue";
</script>
<style scoped lang="less"></style>
