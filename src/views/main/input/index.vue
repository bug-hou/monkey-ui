<template>
  <div class="minput">
    <cpn-header-vue
      title="input"
      name="输入框"
      description="用来做文字的输入"
    ></cpn-header-vue>
    <base-vue></base-vue>
    <title-vue></title-vue>
    <clear-vue></clear-vue>
  </div>
</template>

<script lang="ts" setup name="minput">
/*
 * @Author: bughou
 * @Date: 2022-05-07 16:15:05
 * @Description: 创建一个minput组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import baseVue from "./cpn/size.vue";
import titleVue from "./cpn/title.vue";
import clearVue from "./cpn/clear.vue";
</script>
<style scoped lang="less">
.minput {
}
</style>
