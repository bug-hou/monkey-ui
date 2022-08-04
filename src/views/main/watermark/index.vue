<template>
  <div class="card">
    <cpn-header-vue
      title="tree"
      name="树形选择"
      description="用起来还是挺好用的"
    >
    </cpn-header-vue>
    <div class="layout">
      <base-vue></base-vue>
      <image-vue></image-vue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import baseVue from "./cpn/base.vue";
import imageVue from "./cpn/image.vue";
</script>
