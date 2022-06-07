<template>
  <cpn-play-vue
    title="bottom"
    description="设置距离下部分多少距离时改变为absolute布局"
    :code="topCode"
  >
    <div class="box">
      <div style="height: 200px"></div>
      <m-affix bottom="50" left="50%" style="transform: translateX(-50%)">
        <m-button>距离下部分50px</m-button>
      </m-affix>
      <div style="height: 200px"></div>
    </div>
  </cpn-play-vue>
</template>

<script lang="ts" setup>
/*
 * @Author: bughou
 * @Date: 2022-05-09 16:07:00
 * @Description: 创建一个size组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { topCode } from "../doc";
</script>
<style scoped lang="less">
.box {
  height: 200px;
  overflow-y: scroll;
}
</style>
