<template>
  <cpn-play-vue
    title="icon"
    description="当button遇到icon是可以一起使用的哦"
    :code="iconCode"
  >
    <m-button-group :plain="false">
      <m-button type="success" shape="rect">
        <m-icon name="m-upload"></m-icon>
        成功的上传
      </m-button>
      <p class="gap"></p>
      <m-button type="info" shape="round">
        <m-icon name="m-upload"></m-icon>
        上传信息哦
      </m-button>
      <p class="gap"></p>
      <m-button type="warning" shape="arc">
        <m-icon name="m-upload"></m-icon>
        是一个警告
      </m-button>
      <p class="gap"></p>
      <m-button type="error" shape="circle">
        <m-icon name="m-upload"></m-icon>
      </m-button>
    </m-button-group>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="icon">
/*
 * @Author: bughou
 * @Date: 2022-05-06 16:33:52
 * @Description: 创建一个icon组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { iconCode } from "../doc";
</script>
<style scoped lang="less">
.gap {
  display: inline-block;
  width: 30px;
}
</style>
