<template>
  <cpn-play-vue
    title="width"
    description="width设置分隔线的大小跟css设置一样"
    :code="widthCode"
  >
    <p>我是5px</p>
    <m-divider color="#67c23a" width="3px"> </m-divider>
    <p>我是#67c23a</p>
    <m-divider color="rgb(48, 170, 105)" width="3px">我是3px </m-divider>
    <p>当然也可以使用rgb(48, 170, 105)</p>
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
