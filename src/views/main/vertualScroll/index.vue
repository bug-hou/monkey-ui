<template>
  <div class="card">
    <cpn-header-vue
      title="vertualScroll"
      name="虚拟滚动"
      description="标签用来对一些特殊事物起强调作用"
    >
    </cpn-header-vue>
    <div class="layout">
      <base-vue></base-vue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import baseVue from "./cpn/base.vue";
</script>
<style scoped lang="less"></style>
