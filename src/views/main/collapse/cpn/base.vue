<template>
  <cpn-play-vue title="base" description="简单的使用一下组件" :code="baseCode">
    <m-collapse class="collapse">
      <m-collapse-item title="昨天">
        <div class="item">
          <p>
            昨天已成往事，幻想昨天已经没有可能，唯一可以改变的就是做好当前，加油，为了大厂梦加油
          </p>
          <p>—— bughou</p>
        </div>
      </m-collapse-item>
      <m-collapse-item title="今天">
        <div class="item">
          <p>今天的目标比昨天的知识储备多点就可以了</p>
          <p>—— bughou</p>
        </div>
      </m-collapse-item>
      <m-collapse-item title="明天">
        <div class="item">
          <p>做好今天，放眼未来，加油</p>
          <p>—— bughou</p>
        </div>
      </m-collapse-item>
    </m-collapse>
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
import { baseCode } from "../doc";
</script>
<style scoped lang="less">
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  p:first-child {
    width: 70%;
  }
}
</style>
