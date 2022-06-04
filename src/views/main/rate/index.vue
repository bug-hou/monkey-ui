<template>
  <div class="card">
    <cpn-header-vue title="rate" name="评分" description="rate评分还是很好用的">
    </cpn-header-vue>
    <m-rate v-model="value"></m-rate>
    <m-rate v-model="value" type="half"></m-rate>
    <m-rate v-model="value" type="wantonly" show></m-rate>
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
import { ref } from "vue";
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";

const value = ref(1);
// import sizeVue from "./cpn/size.vue";
// import disabledVue from "./cpn/disabled.vue";
// import buttonVue from "./cpn/button.vue";
// const checks = ref("腾讯");
</script>
<style scoped lang="less"></style>
