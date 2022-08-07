<template>
  <div class="card">
    <cpn-header-vue
      title="tag"
      name="标签"
      description="标签用来对一些特殊事物起强调作用"
    >
    </cpn-header-vue>
    <div class="layout">
      <m-tab>
        <m-tabPane name="登陆" style="background-color: #0ff">
          我是等了界面
        </m-tabPane>
        <m-tabPane name="注册" closable style="background-color: #ff0">
          我是注册界面
        </m-tabPane>
        <m-tabPane name="注册1" style="background-color: #ff0">
          我是注册界面
        </m-tabPane>
        <m-tabPane name="注册2" style="background-color: #ff0">
          我是注册界面
        </m-tabPane>
        <m-tabPane name="注册3" style="background-color: #ff0">
          我是注册界面
        </m-tabPane>
        <m-tabPane name="注册4" style="background-color: #ff0">
          我是注册界面
        </m-tabPane>
        <m-tabPane name="注册5" style="background-color: #ff0">
          我是注册界面
        </m-tabPane>
      </m-tab>
    </div>
  </div>
</template>

<script lang="ts" setup>
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
</script>
<style scoped lang="less"></style>
