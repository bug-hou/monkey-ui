<template>
  <cpn-play-vue
    title="showSeparator和Separator"
    description="showSeparator显示分隔符号,separator自定义显示的分隔符"
    :code="showSeparatorCode"
  >
    <div class="contain">
      <p>当前人数</p>
      <m-number-animation
        :from="from"
        :to="4856"
        showSeparator
      ></m-number-animation>
      <p>/10000</p>
    </div>
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
import { showSeparatorCode } from "../doc";
const from = ref(0);
</script>
<style lang="less" scoped>
.contain {
  font-size: 18px;
  font-weight: bold;
  display: flex;
  > P {
    margin: 0 10px;
  }
}
</style>
