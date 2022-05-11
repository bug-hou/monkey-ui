<template>
  <div class="minput">
    <cpn-header-vue
      title="input"
      name="输入框"
      description="用来做文字的输入"
    ></cpn-header-vue>
    <div class="layout">
      <base-vue></base-vue>
      <title-vue></title-vue>
      <clear-vue></clear-vue>
      <disabled-vue></disabled-vue>
      <limit-vue></limit-vue>
      <loading-vue></loading-vue>
      <round-vue></round-vue>
      <list-vue></list-vue>
      <color-vue></color-vue>
    </div>
  </div>
</template>

<script lang="ts" setup name="minput">
/*
 * @Author: bughou
 * @Date: 2022-05-07 16:15:05
 * @Description: 创建一个minput组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import baseVue from "./cpn/size.vue";
import titleVue from "./cpn/fix.vue";
import clearVue from "./cpn/clear.vue";
import disabledVue from "./cpn/disabled.vue";
import limitVue from "./cpn/limit.vue";
import loadingVue from "./cpn/loading.vue";
import roundVue from "./cpn/round.vue";
import listVue from "./cpn/list.vue";
import colorVue from "./cpn/color.vue";
</script>
