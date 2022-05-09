<template>
  <cpn-play-vue
    title="colors"
    description="除了设置颜色我不知道还可以设置什么，colors应该为一个字符串数组并且每一项应该为颜色+进度:'#5aa978 50%'"
    :code="colorCode"
  >
    <div class="color">
      <m-gradient>我就使用默认的属性吧</m-gradient>

      <m-gradient :colors="['#1f4037 0%', '#5aa978 50%', '#99f2c8 100%']"
        >我还是来自定义的案例</m-gradient
      >
      <m-gradient :colors="['#000 0%', '#000 50%', '#0ff 50%', '#0ff 100%']"
        >我是一个字符串</m-gradient
      >
    </div>
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
import { colorCode } from "../doc";
</script>
<style scoped lang="less">
.color {
  font-weight: bold;
  display: flex;
  justify-content: space-around;
}
</style>
