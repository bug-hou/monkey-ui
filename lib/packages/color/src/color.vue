<template>
  <div class="m-color">
    <div class="m-color-level">
      <div class="m-color-gradient"></div>
    </div>

    <div class="content"></div>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from "vue";

const queryColor = "rgba(255,255,255,1)";
</script>

<style lang="less" scoped>
.color {
  background-image: linear-gradient(
    90deg,
    red,
    rgb(255, 255, 0) 16.66%,
    rgb(0, 255, 0) 33.33%,
    rgb(0, 255, 255) 50%,
    rgb(0, 0, 255) 66.66%,
    rgb(255, 0, 255) 83.33%,
    red
  );
}
</style>
