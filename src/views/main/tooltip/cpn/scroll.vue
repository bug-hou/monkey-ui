<template>
  <cpn-play-vue
    title="width和Height"
    description="设置width和height后超出部分后滚动条"
    :code="scrollCode"
  >
    <m-tooltip
      tooltipText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod blanditiis fuga
  hic odit numquam praesentium consequuntur. Cupiditate iure in molestiae quod
  atque harum veritatis voluptatum asperiores nulla totam sunt, iusto modi
  dolorum eveniet quasi? Ipsam, neque labore. Aliquam eum consequatur doloremque
  nisi, possimus nobis, ipsum quisquam earum accusantium hic eius quia. Aliquam
  mollitia blanditiis adipisci, porro impedit facere dolorem tempore? Unde harum
  incidunt, pariatur nobis laborum, quas esse voluptates, sit quo totam natus
  illo nesciunt amet accusantium sed saepe iure similique culpa enim magni
  adipisci animi dignissimos? Adipisci et eius deleniti, soluta veniam omnis
  nesciunt! Architecto at corporis voluptas doloremque?"
      width="200px"
      height="300px"
    >
      <m-button>tooltipText为一个数组</m-button>
    </m-tooltip>
    <span></span>
    <m-tooltip
      tooltipText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod blanditiis fuga
  hic odit numquam praesentium consequuntur. Cupiditate iure in molestiae quod
  atque harum veritatis voluptatum asperiores nulla totam sunt, iusto modi
  dolorum eveniet quasi? Ipsam, neque labore. Aliquam eum consequatur doloremque
  nisi, possimus nobis, ipsum quisquam earum accusantium hic eius quia. Aliquam
  mollitia blanditiis adipisci, porro impedit facere dolorem tempore? Unde harum
  incidunt, pariatur nobis laborum, quas esse voluptates, sit quo totam natus
  illo nesciunt amet accusantium sed saepe iure similique culpa enim magni
  adipisci animi dignissimos? Adipisci et eius deleniti, soluta veniam omnis
  nesciunt! Architecto at corporis voluptas doloremque?"
      width="200px"
      height="300px"
    >
      <m-button>tooltipText为一个数组</m-button>
    </m-tooltip>
  </cpn-play-vue>
</template>

<script lang="ts" setup>
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { scrollCode } from "../doc";
</script>
<style lang="less" scoped>
span {
  width: 20px;
  display: inline-block;
}
</style>
