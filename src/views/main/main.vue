<template>
  <div class="main">
    <nav>
      <nav-list-vue :title="baseTitle" :list="base"></nav-list-vue>
    </nav>
    <main class="scroll">
      <router-view class="view" replace></router-view>
    </main>
    <aside>
      <ul>
        <li v-for="(item, index) in $route.meta.asides as any ?? []">
          <a :href="item?.href">{{ item?.name }}</a>
        </li>
      </ul>
    </aside>
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
  { name: "图标icon", path: "/icon" },
  { name: "头像avatar", path: "/avatar" },
  { name: "渐变gradient", path: "/gradient" },
  { name: "回到顶部backTop", path: "/backTop" },
  { name: "卡片card", path: "/card" },
  { name: "分隔线divider", path: "/divider" },
  { name: "折叠面板collapse", path: "/collapse" },
  { name: "数字输入inputNumber", path: "/inputNumber" },
  { name: "多选checkBox", path: "/checkBox" },
  { name: "单选radio", path: "/radio" },
  { name: "选择Select", path: "/select" },
  { name: "开关Switch", path: "/switch" },
  { name: "分页器Pagination", path: "/pagination" },
  { name: "标签Tag", path: "/tag" },
  { name: "提示Tooltip", path: "/tooltip" },
  { name: "省略Ellipsis", path: "/ellipsis" },
  { name: "数字动画NumberAnimation", path: "/numberAnimation" },
  { name: "标识Badge", path: "/badge" },
  { name: "评分Rate", path: "/rate" },
  { name: "时间线Timeline", path: "/timeline" },
  { name: "结果Result", path: "/result" },
  { name: "结果Affix", path: "/affix" },
  { name: "级联选择Cascader", path: "/cascader" },
  {
    name: "自动填充AutoComplete",
    path: "/autoComplete"
  },
  {
    name: "自动填充VertualScroll",
    path: "/vertualScroll"
  },
  {
    name: "自动填充Transfer",
    path: "/transfer"
  },
  {
    name: "颜色选择器ColorPicker",
    path: "/colorPicker"
  },
  {
    name: "下拉选择Dropdown",
    path: "/dropdown"
  },
  {
    name: "树形选择Tree",
    path: "/tree"
  },
  {
    name: "轮播图Carousel",
    path: "/carousel"
  },
  {
    name: "菜单Menu",
    path: "/menu"
  },
  {
    name: "提示Alert",
    path: "/alert"
  },
  {
    name: "列表List",
    path: "/list"
  },
  {
    name: "水印Watermark",
    path: "/watermark"
  },
  { name: "制表Tab", path: "/tab" },
  { name: "表单Form", path: "/form" },

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
    padding-right: 5rem;
    .view {
      padding: 1.6rem 1.2rem 1.8rem 1.8rem;
      flex: 1;
      width: 100%;
    }
  }
  aside {
    width: 5rem;
    padding-left: 1rem;
    position: fixed;
    right: 0;
    top: 2rem;
    bottom: 0;
    z-index: 100;
    border-left: 1px solid rgb(239, 239, 245);
    ul {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      li {
        margin: 0.5rem 0;
      }
    }
    a {
      font-size: 0.7rem;
      &:hover {
        color: aqua;
      }
    }
  }
  nav {
    overflow: auto;
    width: 13rem;
    border-right: 1px solid rgb(239, 239, 245);
    box-sizing: border-box;
  }
}
@media screen and (max-width: 1000px) {
  .main {
    aside {
      display: none;
    }
    nav {
      overflow: auto;
      width: 13rem;
      border-right: 1px solid rgb(239, 239, 245);
      box-sizing: border-box;
    }
  }
}
</style>
