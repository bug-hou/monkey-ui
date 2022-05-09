<template>
  <cpn-play-vue
    title="deg"
    description="还有方向可以设置deg来确定你的渐变方向吧"
    :code="degCode"
  >
    <div class="deg">
      <m-gradient deg="to left">我的方向是右边</m-gradient>

      <m-gradient
        deg="0deg"
        :colors="['#1f4037 0%', '#5aa978 50%', '#99f2c8 100%']"
        >我应该是从上到下</m-gradient
      >
      <m-gradient
        deg="135deg"
        :colors="['#000 0%', '#000 50%', '#0ff 50%', '#0ff 100%']"
        >我喜欢斜着走</m-gradient
      >
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
import { degCode } from "../doc";
</script>
<style scoped lang="less">
.deg {
  font-weight: bold;
  display: flex;
  justify-content: space-around;
}
</style>
