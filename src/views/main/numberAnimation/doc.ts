export const backgroundCode = `<template>
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
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  const to = ref(1234);
  setInterval(() => {
    to.value += 5;
  }, 2000);
</script>
`

export const effectCode = `<template>
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
</template>

<script lang="ts" setup>
import { ref } from "vue";
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
`

export const fromCode = `<template>
  <p class="header">定一个小目标吧</p>
  <m-number-animation
    :from="from"
    :to="to"
    :fontSize="58"
    showSeparator
  ></m-number-animation>
  <m-divider titlePlacement="left">点击输入 </m-divider>
  <m-input
    v-model="value"
    @keydown.enter="to = value"
    placeholder="按下enter键确认"
  ></m-input>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const from = ref(0);
const to = ref(123456789);
const value = ref(to.value);
</script>
`

export const showSeparatorCode = `<template>
  <div class="contain">
    <p>当前人数</p>
    <m-number-animation
      :from="0"
      :to="4856"
      showSeparator
    ></m-number-animation>
    <p>/10000</p>
  </div>
</template>

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
`
