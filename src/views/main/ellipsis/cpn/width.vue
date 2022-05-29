<template>
  <cpn-play-vue title="clamp" description="clamp显示多少行文字" :code="widthCode">
    <m-ellipsis clamp="1" width="300px">
      匈奴犹未灭，魏绛复从戎。怅别三河道，言追六郡雄。雁山横代北，狐塞接云中。勿使燕然上，惟留汉将功。
    </m-ellipsis>
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
import { widthCode } from "../doc";
</script>

