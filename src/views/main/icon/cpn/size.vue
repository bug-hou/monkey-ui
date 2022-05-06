<template>
  <cpn-play-vue
    title="size"
    :code="SizeCode"
    description="图标大小small(默认)，mini，medium，big"
  >
    <div class="size" style="margin-bottom: 20px">
      <m-icon name="m-upload" size="mini"></m-icon>
      <m-icon name="m-upload"></m-icon>
      <m-icon name="m-upload" size="medium"></m-icon>
      <m-icon name="m-upload" size="big"></m-icon>
    </div>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="icon">
/*
 * @Author: bughou
 * @Date: 2022-05-06 20:29:30
 * @Description: 创建一个icon组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { SizeCode } from "../doc";
</script>
<style scoped lang="less">
.icon {
}
</style>

