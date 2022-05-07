<template>
  <cpn-play-vue
    title="size"
    description="只有大小不一样，还是挺好看的支持mini，small，medium"
    :code="sizeCode"
  >
    <div>
      <m-input
        v-model="a"
        placeholder="我可能是最小的"
        size="mini"
        index="1"
      ></m-input>
      <br />
      <m-input
        v-model="a"
        placeholder="使用input组件一定要绑定v-model才使用"
        size="small"
        index="5"
      ></m-input>
      <br />
      <m-input
        v-model="a"
        placeholder="我是超大杯哦pro哦"
        size="medium"
        index="3"
      ></m-input>
    </div>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="baseVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { sizeCode } from "../doc";
import { ref } from "vue";
const a = ref("");
</script>
<style scoped lang="less">
.base {
}
</style>
