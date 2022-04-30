<template>
  <div class="navList">
    <h4 :id="title">{{ title + "(" + list.length + ")" }}</h4>
    <ul>
      <li
        v-for="item in list"
        :key="item.path"
        :class="$route.path.includes(item.path) && 'action'"
        @click="$router.push('/component' + item.path)"
      >
        <p v-filterStr="item.name"></p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup name="navList">
/*
 * @Author: bughou
 * @Date: 2022-04-30 13:05:52
 * @Description: 创建一个navList组件
 */
// 从下载的组件中导入函数
import { defineProps, withDefaults } from "vue";
import { initialCapital } from "../../utils";
interface List {
  path: string;
  name: string;
}
const props = withDefaults(defineProps<{ title: string; list: List[] }>(), {
  list: () => []
});
const vFilterStr = {
  mounted(el: HTMLElement, binding: any) {
    const value = binding.value as string;
    const reg = /([^a-z]*)(\w*)/gi;
    const match = reg.exec(value)!;
    let result = `${
      match["1"]
    } <span style="color:#a1a2a3;font-size:12px;">${initialCapital(
      match["2"]
    )}</span>`;
    el.innerHTML = result;
  }
};
</script>
<style scoped lang="less">
.navList {
  padding: 0.5rem;
  h4 {
    font-size: 0.6rem;
    text-align: start;
    margin-left: 0.5rem;
    color: rgb(118, 124, 130);
  }
  ul {
    font-size: 0.8rem;
    li {
      &.action {
        color: #3ac5dc;
        background-color: #c3edf4 !important;
      }
      cursor: pointer;
      padding-left: 1rem;
      height: 2rem;
      line-height: 2rem;
      border-radius: 0.5rem;
      margin: 5px 0;
      &:hover {
        background-color: rgb(239, 239, 245);
      }
    }
  }
}
</style>
