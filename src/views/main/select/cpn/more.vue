<template>
  <cpn-play-vue
    title="more"
    description="当设置more时可以显示更多数据，监听loading事件"
    :code="moreCode"
  >
    <m-select
      :options="options"
      v-model="selectValue"
      more
      @loading="loadingHandle"
    ></m-select>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="baseVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { moreCode } from "../doc";
import { reactive, ref } from "vue";
const options = reactive([
  "京东",
  "阿里",
  "腾讯",
  "字节",
  "北森",
  "百度",
  "苹果",
  "小米",
  "oppo",
  "华为",
  "易方达",
  "茅台"
]);
const selectValue = ref<string[]>([]);

function loadingHandle() {
  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      options.push(options[Math.floor(Math.random() * options.length)]);
    }
  }, 1000);
}
</script>
