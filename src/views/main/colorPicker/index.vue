<template>
  <div class="card">
    <cpn-header-vue
      title="colorPicker"
      name="颜色选择器"
      description="可以让用户自己选择喜欢的颜色"
    >
    </cpn-header-vue>
    <m-color-picker></m-color-picker>
    <div class="layout"></div>
  </div>
</template>

<script lang="ts" setup name="card">
/*
 * @Author: bughou
 * @Date: 2022-05-09 18:42:15
 * @Description: 创建一个card组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
</script>
<style scoped lang="less"></style>
