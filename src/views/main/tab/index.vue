<template>
  <div class="card">
    <cpn-header-vue
      title="tag"
      name="标签"
      description="标签用来对一些特殊事物起强调作用"
    >
    </cpn-header-vue>
    <div class="layout">
      <m-tab type="line" defaultValue="登陆">
        <m-tabPane name="登陆">
          <m-form>
            <m-form-item label="账号" required></m-form-item>
            <m-form-item placement="right">
              <template #label>
                <m-button style="width: 100%; height: 100%"
                  >获取验证吗</m-button
                >
              </template>
            </m-form-item>
            <m-form-item label="密码"></m-form-item>
          </m-form>
        </m-tabPane>
        <m-tabPane name="注册"> </m-tabPane>
      </m-tab>
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
