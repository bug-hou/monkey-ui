<template>
  <div class="avatar">
    <cpn-header-vue
      title="autoComplete"
      name="自动填充"
      description="可以尽量让你少些一点字"
    >
    </cpn-header-vue>
    <div class="layout">
      <prefix-vue></prefix-vue>
      <suffix-vue></suffix-vue>
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
import prefixVue from "./cpn/prefix.vue";
import suffixVue from "./cpn/suffix.vue";
</script>
