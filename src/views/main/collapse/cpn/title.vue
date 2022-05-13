<template>
  <cpn-play-vue
    title="title"
    description="你可以使用title属性做一个简单的标题"
    :code="titleCode"
  >
    <m-collapse class="collapse" title="目标">
      <m-collapse-item title="毕业">
        <div class="item">学习前端的初级部分，自己封装一些小轮子</div>
      </m-collapse-item>
      <m-collapse-item title="毕业前三年">
        <div class="item">
          成为高级前端工程师，完全掌握node，可以对前端项目进行构架
        </div>
      </m-collapse-item>
      <m-collapse-item title="毕业前五年">
        <div class="item">希望能够前端方向有一定的贡献</div>
      </m-collapse-item>
    </m-collapse>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="size">
/*
 * @Author: bughou
 * @Date: 2022-05-09 16:07:00
 * @Description: 创建一个size组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { titleCode } from "../doc";
</script>
<style scoped lang="less">
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  p:first-child {
    width: 70%;
  }
}
</style>
