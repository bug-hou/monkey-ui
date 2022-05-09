<template>
  <cpn-play-vue
    title="plain"
    :code="plainCode"
    description="设置plain为false将button组件变得不再朴素，并且你觉得这些太难看也可以自己传递color(背景颜色)我会自动帮你推导出没有引入的颜色，borderColor边框颜色，textColor文字颜色"
  >
    <m-button-group :plain="false" shape="round">
      <m-button>default</m-button>
      <m-button type="success">success</m-button>
      <m-button type="error">error</m-button>
      <m-button type="primary">primary</m-button>
      <m-button type="info">info</m-button>
      <m-button type="warning">warning</m-button>
      <m-button color="rgb(48, 170, 105)" borderColor="rgb(48, 170, 105)">warning</m-button>
    </m-button-group>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="buttonplain">
/*
 * @Author: bughou
 * @Date: 2022-05-06 16:32:15
 * @Description: 创建一个buttonplain组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { plainCode } from "../doc";
</script>
<style scoped lang="less">
.pbuttonpain {
}
</style>
