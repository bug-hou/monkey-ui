<template>
  <div class="main">
    <nav>
      <nav-list-vue :title="baseTitle" :list="base"></nav-list-vue>
    </nav>
    <main>
      <router-view class="view"></router-view>
      <aside></aside>
    </main>
  </div>
</template>

<script lang="ts" setup name="component">
/*
 * @Author: bughou
 * @Date: 2022-04-29 15:19:36
 * @Description: 创建一个name组件
 */
// 从下载的组件中导入函数
import {} from "vue";
import navListVue from "../../components/navList/navList.vue";
const baseTitle = "基本组件";
const base = [
  { name: "按钮button", path: "/button" },
  { name: "输入框input", path: "/input" },
  { name: "图标icon", path: "/icon" }
];
</script>
<style scoped lang="less">
.main {
  display: flex;
  main {
    flex: 1;
    display: flex;
    box-sizing: border-box;
    overflow: auto;
    .view {
      padding: 1.6rem 1.2rem 2.8rem 2.8rem;
      flex: 1;
    }
    aside {
      width: 5rem;
      background-color: pink;
    }
  }
  nav {
    overflow: auto;
    width: 10rem;
    border-right: 1px solid rgb(239, 239, 245);
    box-sizing: border-box;
  }
}
</style>
