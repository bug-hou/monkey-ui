<template>
  <cpn-play-vue title="clamp" description="clamp显示多少行文字" :code="clampCode">
    <m-ellipsis clamp="2">
      黄金错刀白玉装，夜穿窗扉出光芒。丈夫五十功未立，提刀独立顾八荒。京华结交尽奇士，意气相期共生死。千年史册耻无名，一片丹心报天子。尔来从军天汉滨，南山晓雪玉嶙峋
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
import { clampCode } from "../doc";
</script>
