<template>
  <cpn-play-vue
    title="showBackground"
    description="showBackground为true时显示背景色"
    :code="backgroundCode"
  >
    <m-number-animation
      :from="1234"
      :to="to"
      :fontSize="28"
      suffix="人数"
      showBackground
      color="#fff"
      prefix="MonkyesUI突破"
      effect="scroll"
      :width="25"
      :gap="10"
    ></m-number-animation>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="baseVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 17:10:36
 * @Description: 创建一个baseVue组件
 */
// 从下载的组件中导入函数
import { ref } from "vue";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { backgroundCode } from "../doc";
const to = ref(1234);
setInterval(() => {
  to.value += 5;
}, 2000);
</script>
<style lang="less" scoped>
.header {
  font-size: 30px;
  font-weight: bold;
}
</style>
