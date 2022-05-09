<template>
  <cpn-play-vue
    title="size"
    description="不同大小的容器存放头像"
    :code="sizeCode"
  >
    <div class="size">
      <m-avatar
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/26"
        size="mini"
      ></m-avatar>
      <m-avatar
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/27"
        size="small"
      ></m-avatar>
      <m-avatar
        src="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/28"
        size="medium"
      ></m-avatar>
      <m-avatar
        size="large"
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
import { sizeCode } from "../doc";
</script>
<style scoped lang="less">
.size {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
