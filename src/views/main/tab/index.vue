<template>
  <div class="card">
    <cpn-header-vue
      title="tag"
      name="标签"
      description="标签用来对一些特殊事物起强调作用"
    >
    </cpn-header-vue>
    <div class="layout">
      <div style="width: 70%; border: 1px solid #6666; padding: 10px">
        <m-tab type="line" defaultValue="登陆">
          <m-tabPane name="登陆">
            <div class="login">
              <m-input radius="3" placeholder="请输入账号"> </m-input>
              <m-input radius="3" placeholder="请输入密码"></m-input>
              <m-radio>我已经阅读了monkey的所有信息</m-radio>
              <m-button style="width: 80%">登陆</m-button>
            </div>
          </m-tabPane>
          <m-tabPane name="注册" closable>
            <div class="login">
              <m-input radius="3" placeholder="请输入账号"> </m-input>
              <m-input radius="3" placeholder="请输入密码"></m-input>
              <m-input radius="3" placeholder="请确认密码"></m-input>
              <m-radio>我已经阅读了monkey的所有信息</m-radio>
              <m-button style="width: 80%">登陆</m-button>
            </div>
          </m-tabPane>
        </m-tab>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
</script>
<style scoped lang="less">
.login {
  display: flex;
  width: 100%;
  height: 280px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
