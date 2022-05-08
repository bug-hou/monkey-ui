<template>
  <cpn-play-vue title="loading" description="实现加载动画" :code="loadingCode">
    <m-input v-model="a" loading placeholder="我动画一直显示"></m-input>
    <br />
    <m-input v-model="a" :loading="loading" placeholder="只要你输入我就有动画">
    </m-input>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="disabled">
/*
 * @Author: bughou
 * @Date: 2022-05-08 13:53:58
 * @Description: 创建一个disabled组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { loadingCode } from "../doc";
import { ref, watch } from "vue";
const a = ref("");
const loading = ref(false);
let timer: any;
watch(a, () => {
  loading.value = true;
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => (loading.value = false), 1000);
});
</script>

