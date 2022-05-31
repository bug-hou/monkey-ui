<template>
  <cpn-play-vue
    title="type"
    description="type改变标记的颜色default(默认),error,primary,success,warning,info"
    code='<m-back-top bottom="150" circle>回</m-back-top>'
  >
    <m-badge :value="5" type="error">
      <m-avatar
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/26"
      ></m-avatar>
    </m-badge>
    <span class="gab"></span>
    <m-badge :value="999" :max="99" type="info">
      <m-avatar
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/26"
      ></m-avatar>
    </m-badge>
    <span class="gab"></span>
    <m-badge :value="15" type="primary">
      <m-avatar
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/26"
      ></m-avatar>
    </m-badge>
    <span class="gab"></span>
    <m-badge :value="999" :max="99" type="success">
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
    <m-badge :value="999" :max="99" type="warning">
      <m-avatar
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/26"
      ></m-avatar>
    </m-badge>
  </cpn-play-vue>
</template>

<script lang="ts" setup>
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
</script>

<style scoped lang="less">
.gab {
  width: 30px;
  display: inline-block;
}
</style>
