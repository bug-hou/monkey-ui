<template>
  <div class="main">
    <nav>
      <nav-list-vue :title="baseTitle" :list="base"></nav-list-vue>
    </nav>
    <main>
      <router-view></router-view>
    </main>
    <aside></aside>
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
  { name: "输入框input", path: "/input" }
];
</script>
<style scoped lang="less">
.main {
  display: flex;
  main {
    flex: 1;
    box-sizing: border-box;
    padding: 1.6rem 1.2rem 2.8rem 2.8rem;
  }
  nav {
    overflow: auto;
    width: 10rem;
    border-right: 1px solid rgb(239, 239, 245);
    box-sizing: border-box;
  }
  aside {
    width: 5rem;
    background-color: pink;
  }
}
</style>
