<template>
  <div class="card">
    <cpn-header-vue
      title="tag"
      name="标签"
      description="标签用来对一些特殊事物起强调作用"
    >
    </cpn-header-vue>
    <div class="layout">
      <base-vue></base-vue>
      <initial-vue></initial-vue>
      <filter-vue></filter-vue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import baseVue from "./src/base.vue";
import filterVue from "./src/filter.vue";
import InitialVue from "./src/initial.vue";
</script>
<style scoped lang="less"></style>
