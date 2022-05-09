<template>
  <cpn-play-vue
    title="error"
    description="当你图片地址错误时，会显示一个默认图片，你也可以通过errorSrc指定默认图片"
    :code="errorCode"
  >
    <div class="error">
      <div>
        <m-avatar src="https://himg.bdimg.com"></m-avatar>
        <p>使用默认图片</p>
      </div>
      <div>
        <m-avatar
          src="https://himg.bdimg.com"
          size="small"
          :errorSrc="avatar"
        ></m-avatar>
        <p>我把默认的替换了</p>
      </div>
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
import avatar from "../config/avatar.png";
import { errorCode } from "../doc";
</script>
<style scoped lang="less">
.error {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 0.6rem;
}
</style>
