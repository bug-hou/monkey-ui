<template>
  <cpn-play-vue
    title="footer"
    description="footer插槽显示一些不太重要的信息"
    :code="footerCode"
  >
    <m-card class="card">
      <template #header>
        <h3 class="custom">
          <m-icon name="m-calendar"></m-icon>
          <p>内卷</p>
        </h3>
      </template>
      “内卷”本是一个学术名词，在学术文献中常用作“内卷化”。经济学家韦森认为，“内卷”这个概念是德国哲学家康德在《判断力批判》一书中最早使用的。使内卷化概念得到发展的是两位人类学家，一位是亚历山大·亚历山大罗维奇·戈登威泽，他将一类文化模式达到了某种最终的形态以后，既没有办法稳定下来，也没有办法转变为新的形态，而只能不断地在内部变得更加复杂的现象称为“内卷化”
      <template #footer>加油，明天就可以进厂了</template>
    </m-card>
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
import { footerCode } from "../doc";
</script>
<style scoped lang="less">
.custom {
  font-size: 24px;
  color: rgb(50, 42, 48);
  display: flex;
}
</style>
