<template>
  <div class="app">
    <header>
      <div class="logo" @click="$router.go(0)">
        <img src="./assets/M logo.png" alt="monkeyUi" />
        <p>monkey UI</p>
      </div>
      <TopBar :barList="barList">
        <template #search>
          <input type="text" placeholder="搜索" />
        </template>
      </TopBar>
    </header>
    <router-view class="view">
      <template #default="{ Component }">
        <keep-alive :max="10">
          <transition name="route">
            <component :is="Component"></component>
          </transition>
        </keep-alive>
      </template>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
/*
 * @Author: bughou
 * @Date: 2022-04-27 17:35:05
 * @Description: 创建一个app组件
 */
// 从下载的组件中导入函数
import TopBar from "./components/header/index.vue";
const barList = [
  {
    name: "首页",
    path: "/index"
  },
  {
    name: "组件",
    path: "/component"
  },
  {
    name: "配置",
    path: "/config"
  },
  {
    name: "音频",
    path: "/audio"
  },
  {
    name: "视频",
    path: "/video"
  },
  {
    name: "搜索",
    path: "",
    self: true,
    slotName: "search"
  },
  {
    name: "github",
    path: "https://www.github.com/bug-hou/monkey-ui"
  },
  {
    name: "2.28.2",
    path: ""
  }
];
</script>
<style scoped lang="less">
@color: (rgb(239, 239, 245));
.app {
  header {
    box-sizing: border-box;
    border-bottom: 1px solid @color;
    display: flex;
    height: 2rem;
    justify-content: space-around;
    align-items: center;
    .logo {
      display: flex;
      cursor: pointer;
      img {
        width: 2rem;
        height: 2rem;
        vertical-align: middle;
        margin-right: 0.5rem;
      }
      p {
        line-height: 2rem;
      }
    }
    input {
      width: 8rem;
      border-radius: 2px;
      height: 90%;
      font-size: 80%;
      padding-left: 5px;
    }
  }
  .view {
    width: 100%;
    height: calc(100vh - 2rem);
  }
}
</style>
