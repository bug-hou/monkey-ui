<template>
  <cpn-play-vue
    title="closabled"
    description="closabled为true时移出标签"
    :code="closabledCode"
    style="line-height: 50px"
  >
    <template v-for="(item, index) in list" :key="index">
      <m-tag closabled @close="closeHandle(index)">{{ item }}</m-tag>
      <span></span>
    </template>
    <m-input
      placeholder="+ Tag"
      v-model="tag"
      @keydown.enter="keyDownHandle"
      size="mini"
      style="width: 100px; height: 28px"
    ></m-input>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="baseVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import { reactive, ref } from "vue";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { closabledCode } from "../doc";
const tag = ref("");
const list = reactive(["Tag 1", "Tag 2", "Tag 3", "Tag 4"]);
function keyDownHandle() {
  if (tag.value) {
    list.push(tag.value);
    tag.value = "";
  }
}
function closeHandle(index: number) {
  list.splice(index, 1);
}
</script>
<style lang="less" scoped>
span {
  width: 20px;
  display: inline-block;
}
</style>
