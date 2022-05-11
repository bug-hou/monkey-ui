<template>
  <cpn-play-vue
    title="color"
    description="你可能需要颜色来提示用户输入是否正确"
    :code="colorCode"
  >
    <m-input
      v-model="a"
      :color="color"
      placeholder="当你输入monkeysUI就对了"
    ></m-input>
    <br />
    <m-input v-model="a" color="#f56c6c" placeholder="我背景是红色的">
    </m-input>
    <br />
    <m-input
      v-model="a"
      color="rgb(48, 170, 105)"
      type="password"
      placeholder="我的背景是不是很好看"
    ></m-input>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="clearVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个clearVue组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { colorCode } from "../doc";
import { ref, watch } from "vue";
const a = ref("");
const color = ref("");
watch(a, () => {
  if (a.value !== "monkeysUI") {
    color.value = "#f56c6c";
  } else {
    color.value = "rgb(48, 170, 105)";
  }
});
</script>
