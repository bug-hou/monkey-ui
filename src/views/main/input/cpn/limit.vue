<template>
  <cpn-play-vue
    title="maxLength"
    description="maxLength只能为整数哦，设置了我,就可以显示你输入多少字了"
    :code="limitCode"
  >
    <m-input
      v-model="a"
      :maxLength="10"
      placeholder="我只能输入10个字"
    ></m-input>
    <br />
    <m-input
      v-model="a"
      :maxLength="10"
      placeholder="10个字，不能多输入哦"
      suffix="字"
      prefix="10"
    >
    </m-input>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="disabled">
/*
 * @Author: bughou
 * @Date: 2022-05-08 13:53:58
 * @Description: 创建一个disabled组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { limitCode } from "../doc";
import { ref } from "vue";
const a = ref("");
</script>
