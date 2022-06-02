export const addCode = `<template>
  <div class="contain">
    <m-badge :value="value" :show="switchValue">
      <m-avatar
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/26"
      ></m-avatar>
    </m-badge>
    <span class="gab"></span>
    <m-badge :value="value" :max="9" :show="switchValue">
      <m-avatar
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/26"
      ></m-avatar>
    </m-badge>
    <sapn class="gab"></sapn>
    <m-button-group class="addGroup" :plain="false" :border="true">
      <m-button shape="rect" @click="value--">-</m-button>
      <m-button shape="rect" @click="value++">+</m-button>
    </m-button-group>
    <sapn class="gab"></sapn>
    <m-switch v-model="switchValue">
      <template #checked> 显示badge </template>
      <template #unChecked> 隐藏badge </template>
    </m-switch>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value = ref(2);
const switchValue = ref(true);
</script>

<style scoped lang="less">
.contain {
  display: flex;
  align-items: center;
  .gab {
    width: 50px;
    display: inline-block;
  }
  .addGroup {
    border-radius: 15px;
    overflow: hidden;
  }
}
</style>
`

export const dotCode = `<template>
  <m-badge :value="5" dot>
    <m-avatar
      src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/26"
    ></m-avatar>
  </m-badge>
  <span class="gab"></span>
  <m-badge :value="999" :max="99" dot>
    <m-avatar
      src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/26"
    ></m-avatar>
  </m-badge>
  <span class="gab"></span>
  <m-badge :value="15" medium dot>
    <m-avatar
      src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/26"
    ></m-avatar>
  </m-badge>
  <span class="gab"></span>
  <m-badge :value="999" :max="99" medium dot>
    <m-avatar
      src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/26"
    ></m-avatar>
  </m-badge>
</template>

<style scoped lang="less">
.gab {
  width: 50px;
  display: inline-block;
}
</style>
`

export const mediumCode = `<template>
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
</template>

<style scoped lang="less">
.gab {
  width: 50px;
  display: inline-block;
}
</style>
`

export const typeCode = `<template>
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
</template>

<style scoped lang="less">
.gab {
  width: 30px;
  display: inline-block;
}
</style>
`
