<template>
  <div class="card">
    <cpn-header-vue
      title="numberAnimation"
      name="数字动画"
      description="让数字随着音乐跳动"
    >
    </cpn-header-vue>
    <div class="layout">
      <effect-vue></effect-vue>
      <from-vue></from-vue>
      <background-vue></background-vue>
      <show-separator-vue></show-separator-vue>
    </div>
  </div>
</template>

<script lang="ts" setup name="card">
/*
 * @Author: bughou
 * @Date: 2022-05-09 18:42:15
 * @Description: 创建一个card组件
 */
// 从下载的组件中导入函数
// import { ref } from "vue";
import { ref } from "vue";
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import effectVue from "./cpn/effect.vue";
import fromVue from "./cpn/from.vue";
import backgroundVue from "./cpn/background.vue";
import showSeparatorVue from "./cpn/showSeparator.vue";
// import sizeVue from "./cpn/size.vue";
// import backVue from "./cpn/back.vue";
// import skipVue from "./cpn/skip.vue";
// import intervalVue from "./cpn/interval.vue";
// import pickerVue from "./cpn/picker.vue";
// import prefixVue from "./cpn/prefix.vue";
const active = ref(true);

const to = ref(123456789);

// setTimeout(() => {
//   active.value = true;
// }, 10000);
setInterval(() => {
  to.value += 4;
}, 5000);
</script>
<style scoped lang="less"></style>
