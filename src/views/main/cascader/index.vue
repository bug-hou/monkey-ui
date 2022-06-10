<template>
  <div>
    <cpn-header-vue title="cascader" name="级联选择" description="用来选择多个">
    </cpn-header-vue>
    <m-cascader :options="options"></m-cascader>
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
import { ref } from "vue";
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
// import sizeVue from "./cpn/size.vue";
// import disabledVue from "./cpn/disabled.vue";
// import buttonVue from "./cpn/button.vue";
// import maxVue from "./cpn/max.vue";
const options = [
  {
    label: "1-1",
    value: "1-1"
  },
  {
    label: "1-1",
    value: "1-1",
    children: [
      {
        label: "2-1",
        value: "2-1"
      },
      {
        label: "2-1",
        value: "2-1",
        children: [
          {
            label: "2-1",
            value: "2-1"
          },
          {
            label: "2-1",
            value: "2-1"
          },
          {
            label: "2-1",
            value: "2-1"
          }
        ]
      },
      {
        label: "2-1",
        value: "2-1"
      }
    ]
  },
  {
    label: "1-1",
    value: "1-1"
  },
  {
    label: "1-1",
    value: "1-1"
  },
  {
    label: "1-1",
    value: "1-1",
    children: [
      {
        label: "2-1",
        value: "2-1"
      },
      {
        label: "2-1",
        value: "2-1"
      },
      {
        label: "2-1",
        value: "2-1"
      }
    ]
  },
  {
    label: "1-1",
    value: "1-1"
  },
  {
    label: "1-1",
    value: "1-1"
  },
  {
    label: "1-1",
    value: "1-1",
    children: [
      {
        label: "2-1",
        value: "2-1"
      },
      {
        label: "2-1",
        value: "2-1"
      },
      {
        label: "2-1",
        value: "2-1"
      }
    ]
  },
  {
    label: "1-1",
    value: "1-1"
  },
  {
    label: "1-1",
    value: "1-1"
  },
  {
    label: "1-1",
    value: "1-1",
    children: [
      {
        label: "2-1",
        value: "2-1"
      },
      {
        label: "2-1",
        value: "2-1"
      },
      {
        label: "2-1",
        value: "2-1"
      }
    ]
  },
  {
    label: "1-1",
    value: "1-1"
  },
  {
    label: "1-1",
    value: "1-1"
  },
  {
    label: "1-1",
    value: "1-1",
    children: [
      {
        label: "2-1",
        value: "2-1"
      },
      {
        label: "2-1",
        value: "2-1"
      },
      {
        label: "2-1",
        value: "2-1"
      }
    ]
  },
  {
    label: "1-1",
    value: "1-1"
  },
  {
    label: "1-1",
    value: "1-1"
  },
  {
    label: "1-1",
    value: "1-1",
    children: [
      {
        label: "2-1",
        value: "2-1"
      },
      {
        label: "2-1",
        value: "2-1"
      },
      {
        label: "2-1",
        value: "2-1"
      }
    ]
  },
  {
    label: "1-1",
    value: "1-1"
  }
];
</script>
<style scoped lang="less"></style>
