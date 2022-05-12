<template>
  <cpn-play-vue
    title="vertical"
    description="我也可以横向显示，vertical设置为true，加字就没有分隔线了"
    :code="verticalCode"
  >
    <div class="vertical">
      <p>横向显示</p>
      <m-divider vertical> </m-divider>
      <p>还是挺好看的</p>
      <m-divider vertical> </m-divider>
      <p>你也可以设置颜色</p>
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
import { verticalCode } from "../doc";
</script>
<style scoped lang="less">
.vertical {
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-evenly;
}
</style>
