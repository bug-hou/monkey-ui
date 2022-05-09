<template>
  <div class="avatar">
    <cpn-header-vue
      title="avatar"
      name="头像"
      description="你可能需要一个装照片的容器"
    >
    </cpn-header-vue>
    <size-vue></size-vue>
    <error-vue></error-vue>
    <round-vue></round-vue>
  </div>
</template>

<script lang="ts" setup name="avatar">
/*
 * @Author: bughou
 * @Date: 2022-05-09 15:38:44
 * @Description: 创建一个avatar组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import sizeVue from "./cpn/size.vue";
import errorVue from "./cpn/error.vue";
import roundVue from "./cpn/round.vue";
</script>
<style scoped lang="less">
.avatar {
}
</style>
