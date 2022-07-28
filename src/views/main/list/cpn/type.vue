<template>
  <cpn-play-vue
    title="type"
    description="type的值设置为public，disc，decimal，divider，circle，square，stripe"
    :code="baseCode"
  >
    <m-list>
      <m-list-item>
        <div class="list-div">
          <m-list>
            <m-list-item>腾讯</m-list-item>
            <m-list-item>字节</m-list-item>
            <m-list-item>阿里</m-list-item>
            <m-list-item>百度</m-list-item>
          </m-list>
          <m-list type="disc">
            <m-list-item>腾讯</m-list-item>
            <m-list-item>字节</m-list-item>
            <m-list-item>阿里</m-list-item>
            <m-list-item>百度</m-list-item>
          </m-list>
          <m-list type="decimal">
            <m-list-item>腾讯</m-list-item>
            <m-list-item>字节</m-list-item>
            <m-list-item>阿里</m-list-item>
            <m-list-item>百度</m-list-item>
          </m-list>
        </div>
      </m-list-item>
      <m-list-item>
        <div class="list-div">
          <m-list type="circle">
            <m-list-item>腾讯</m-list-item>
            <m-list-item>字节</m-list-item>
            <m-list-item>阿里</m-list-item>
            <m-list-item>百度</m-list-item>
          </m-list>
          <m-list type="square">
            <m-list-item>腾讯</m-list-item>
            <m-list-item>字节</m-list-item>
            <m-list-item>阿里</m-list-item>
            <m-list-item>百度</m-list-item>
          </m-list>
          <m-list type="divider">
            <m-list-item>腾讯</m-list-item>
            <m-list-item>字节</m-list-item>
            <m-list-item>阿里</m-list-item>
            <m-list-item>百度</m-list-item>
          </m-list>
        </div>
      </m-list-item>
      <m-list-item>
        <div class="list-div">
          <m-list type="stripe">
            <m-list-item>腾讯</m-list-item>
            <m-list-item>字节</m-list-item>
            <m-list-item>阿里</m-list-item>
            <m-list-item>百度</m-list-item>
          </m-list>
        </div>
      </m-list-item>
    </m-list>
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
import { baseCode } from "../doc";
</script>
<style lang="less">
.list-div {
  display: flex;
  gap: 10px;
  > * {
    flex: 1;
  }
}
</style>
