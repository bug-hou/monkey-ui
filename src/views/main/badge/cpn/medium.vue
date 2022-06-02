<template>
  <cpn-play-vue
    title="medium"
    description="medium为true时，标记会相当于大点"
    :code="mediumCode"
  >
    <m-badge :value="5">
      <m-avatar
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/26"
      ></m-avatar>
    </m-badge>
    <span class="gab"></span>
    <m-badge :value="999" :max="99">
      <m-avatar
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/26"
      ></m-avatar>
    </m-badge>
    <span class="gab"></span>
    <m-badge :value="15" medium>
      <m-avatar
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/26"
      ></m-avatar>
    </m-badge>
    <span class="gab"></span>
    <m-badge :value="999" :max="99" medium>
      <m-avatar
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/26"
      ></m-avatar>
    </m-badge>
  </cpn-play-vue>
</template>

<script lang="ts" setup>
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { mediumCode } from "../doc";
</script>

<style scoped lang="less">
.gab {
  width: 50px;
  display: inline-block;
}
</style>
