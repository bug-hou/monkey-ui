<template>
  <cpn-play-vue
    title="prefix"
    description="设置前缀/后缀将你要显示值通过prefix传递(前缀)suffix(后缀)，当然也可以添加具名插槽suffix或者prefix实现插槽"
    :code="fixCode"
  >
    <m-input v-model="a" placeholder="我可以定义前缀哦" prefix="http">
    </m-input>
    <br />
    <m-input
      v-model="a"
      placeholder="后缀和前缀"
      prefix="你的名字"
      suffix="你的名字"
    >
    </m-input>
    <br />
    <m-input
      v-model="a"
      placeholder="红色配绿色绝配"
      prefix="红色前缀"
      prefixColor="red"
      prefixTextColor="white"
      suffix="绿色后缀"
      suffixColor="green"
      suffixTextColor="white"
    >
    </m-input>
    <br />
    <m-input
      v-model="a"
      placeholder="button加上input的火花"
      prefix
      prefixColor="red"
      prefixTextColor="white"
      suffix
      suffixColor="green"
      suffixTextColor="white"
    >
      <template #prefix>
        <m-button type="success">前缀</m-button>
      </template>
      <template #suffix>
        <m-button color="rgb(48, 170, 105)">后缀</m-button>
      </template>
    </m-input>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="baseVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { fixCode } from "../doc";
import { ref } from "vue";
const a = ref("");
</script>
<style scoped lang="less">
.base {
}
</style>
