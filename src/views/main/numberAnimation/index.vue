<template>
  <div class="card">
    <cpn-header-vue
      title="pagination"
      name="分页器"
      description="可用用来做分页显示的"
    >
    </cpn-header-vue>
    <m-number-animation
      :to="100000000"
      :from="0"
      :active="active"
    ></m-number-animation>
    <br />
    <br />
    <m-number-animation
      :to="123456789"
      :from="0"
      effect="scroll"
    ></m-number-animation>
    <div class="layout"></div>
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
// import sizeVue from "./cpn/size.vue";
// import backVue from "./cpn/back.vue";
// import skipVue from "./cpn/skip.vue";
// import intervalVue from "./cpn/interval.vue";
// import pickerVue from "./cpn/picker.vue";
// import prefixVue from "./cpn/prefix.vue";
const active = ref(false);

setTimeout(() => {
  console.log("first");
  active.value = true;
}, 1000);
</script>
<style scoped lang="less"></style>
