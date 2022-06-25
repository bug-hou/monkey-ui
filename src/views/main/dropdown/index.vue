<template>
  <div class="card">
    <cpn-header-vue
      title="dropdown"
      name="下拉菜单"
      description="将两个内容分隔开来，为什么就不能在一起了"
    >
    </cpn-header-vue>
    <m-dropdown :options="options">
      <m-button>请选择</m-button>
    </m-dropdown>
    <div class="layout"></div>
  </div>
</template>

<script lang="ts" setup name="card">
/*
 * @Author: bughou
 * @Date: 2022-05-09 18:42:15
 * @Description: 创建一个card组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";

const options = [
  {
    label: "bughou",
    value: "houxiagny"
  },
  {
    label: "bughou",
    value: "houxiagny"
  },
  {
    label: "bughou",
    value: "houxiagny",
    children: [
      {
        label: "侯湘仪",
        value: 18,
        children: [
          {
            label: "YL",
            value: "802399"
          }
        ]
      },
      {
        label: "侯湘仪",
        value: 18
      }
    ]
  },
  {
    label: "bughou",
    value: "houxiagny"
  },
  {
    label: "bughou",
    value: "houxiagny"
  }
];
</script>
