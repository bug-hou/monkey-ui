<template>
  <cpn-play-vue
    title="type"
    :code="typeCode"
    description="可以设置default(默认)，success，error，primary，info，warning"
  >
    <m-button-group class="type">
      <m-button>default</m-button>
      <m-button type="success">success</m-button>
      <m-button type="error">error</m-button>
      <m-button type="primary">primary</m-button>
      <m-button type="info">info</m-button>
      <m-button type="warning">warning</m-button>
    </m-button-group>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="buttonType">
/*
 * @Author: bughou
 * @Date: 2022-05-06 16:29:09
 * @Description: 创建一个buttonType组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { typeCode } from "../doc";
</script>
<style scoped lang="less">
.buttonType {
}
</style>
