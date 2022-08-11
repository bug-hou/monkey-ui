<template>
  <div class="gradient">
    <cpn-header-vue
      title="form"
      name="表单"
      description="让你觉得表单原来如此简单"
    >
    </cpn-header-vue>
    <div class="layout">
      <m-form v-model="userInfo">
        <m-form-item
          label="bughou"
          v-model="value"
          name="name.age"
          showTooltip
          :verify="[{ rule: 'bughou', content: ' LY' }]"
        >
        </m-form-item>
        <m-form-item label="bughou" name="age"> </m-form-item>
        <template #submit>
          <m-button>提交</m-button>
        </template>
      </m-form>
      <p>{{ userInfo }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup name="gradient">
/*
 * @Author: bughou
 * @Date: 2022-05-09 18:42:15
 * @Description: 创建一个gradient组件
 */
// 从下载的组件中导入函数
import { reactive, ref, watch } from "vue";
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
const value = ref();

const userInfo = ref({});
watch(userInfo, (newValue) => {
  console.log(newValue);
});
</script>
<style scoped lang="less"></style>
