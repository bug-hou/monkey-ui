<template>
  <div class="card">
    <cpn-header-vue title="rate" name="评分" description="rate评分还是很好用的">
    </cpn-header-vue>
    <div class="layout">
      <size-vue></size-vue>
      <readonly-vue></readonly-vue>
      <show-vue></show-vue>
      <type-vue></type-vue>
      <color-vue></color-vue>
      <count-vue></count-vue>
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
import sizeVue from "./cpn/size.vue";
import readonlyVue from "./cpn/readonly.vue";
import showVue from "./cpn/show.vue";
import typeVue from "./cpn/type.vue";
import colorVue from "./cpn/color.vue";
import countVue from "./cpn/count.vue";
</script>
<style scoped lang="less"></style>
