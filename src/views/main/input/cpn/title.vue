<template>
  <cpn-play-vue
    title="prefix"
    description="设置前缀可以有点麻烦，先设置prefix为true，在添加具名插槽title"
    :code="sizeCode"
  >
    <m-input v-model="a" placeholder="我可以定义前缀哦" prefix>
      <template #prefix>
        <p>http</p>
      </template>
    </m-input>
    <br />
    <m-input v-model="a" placeholder="后缀和前缀" prefix suffix>
      <template #prefix>
        <p>你的名字</p>
      </template>
      <template #suffix> 你的名字 </template>
    </m-input>
    <br />
    <m-input v-model="a" placeholder="我可以定义前缀哦" prefix>
      <template #prefix>
        <m-button>使用button</m-button>
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
import { sizeCode } from "../doc";
import { ref } from "vue";
const a = ref("");
</script>
<style scoped lang="less">
.base {
}
</style>
