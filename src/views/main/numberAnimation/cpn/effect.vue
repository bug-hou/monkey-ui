<template>
  <cpn-play-vue
    title="effect"
    description="effect选择动画滚动样式scroll，change(默认)"
    :code="effectCode"
  >
    <div class="contain">
      <div class="item">
        <span>当前你的薪资为:</span>
        <m-number-animation
          :from="0"
          :to="15632"
          :active="active1"
          :fontSize="28"
          color="#987789"
          bold
        ></m-number-animation>
        <span>元</span>
      </div>
      <m-button @click="active1 = true"> 点击显示 </m-button>
    </div>
    <m-divider titlePlacement="left">相差多少 </m-divider>
    <div class="contain">
      <div class="item">
        <span>你当前已经使用:</span>
        <m-number-animation
          :from="0"
          :to="18632"
          :active="active2"
          effect="scroll"
          :fontSize="28"
          color="#409eff"
          bold
        ></m-number-animation>
        <span>元</span>
      </div>
      <m-button @click="active2 = true">点击显示</m-button>
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
import { effectCode } from "../doc";
const active1 = ref(false);
const active2 = ref(false);
</script>
<style lang="less" scoped>
.contain {
  display: flex;
  justify-content: space-between;
  font-size: 28px;

  .item {
    align-items: center;
    display: flex;
  }
}
</style>
