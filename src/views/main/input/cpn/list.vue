<template>
  <cpn-play-vue
    title="list"
    description="你可以显示列表然后来进行选择"
    :code="listCode"
  >
    <m-input
      v-model="a"
      placeholder="我可以对你输入的内容的进行筛选并且高亮显示"
      :list="showListOne"
      round
      suffix="列表数据"
    >
      <template #list="{ value }">
        <p>
          <span class="strong">{{ a }}</span>
          <span>{{ value.slice(a.length) }}</span>
        </p>
      </template>
    </m-input>
    <br />
    <m-input
      v-model="b"
      radius="20px"
      :list="listTwo"
      placeholder="自定义radius属性"
    >
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
import { listCode } from "../doc";
import { reactive, ref, watch } from "vue";
const a = ref("");
const b = ref("");
const listOne = reactive([
  "html",
  "css",
  "javascript",
  "java",
  "php",
  "typescript",
  "c++",
  "golang"
]);
let showListOne = ref([...listOne]);
const listTwo = reactive([
  "input",
  "button",
  "avatar",
  "icon",
  "inputNumber",
  "slider",
  "update"
]);
watch(a, () => {
  showListOne.value = [...listOne.filter((item) => item.startsWith(a.value))];
});
</script>
<style scoped lang="less">
.strong {
  color: #409eff;
  font-weight: bold;
}
</style>
