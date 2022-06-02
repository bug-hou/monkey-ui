<template>
  <cpn-play-vue
    title="medium"
    description="medium为true时，标记会相当于大点"
    :code="addCode"
  >
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
  </cpn-play-vue>
</template>

<script lang="ts" setup>
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { addCode } from "../doc";
import { ref } from "vue";

const value = ref(2);
const switchValue = ref(true);
</script>

<style scoped lang="less">
.contain {
  display: flex;
  // justify-content: center;
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
