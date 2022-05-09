<template>
  <cpn-play-vue
    title="round"
    description="头像怎么说还是圆的好看"
    :code="roundCode"
  >
    <div class="round">
      <m-avatar
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/26"
        round
      ></m-avatar>
      <m-avatar
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/27"
        round
      ></m-avatar>
      <m-avatar
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/28"
        round
      ></m-avatar>
      <m-avatar
        round
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/29"
      ></m-avatar>
    </div>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="size">
/*
 * @Author: bughou
 * @Date: 2022-05-09 16:07:00
 * @Description: 创建一个size组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { roundCode } from "../doc";
</script>
<style scoped lang="less">
.round {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 0.6rem;
}
</style>
