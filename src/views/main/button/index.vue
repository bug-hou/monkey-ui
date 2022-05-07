<template>
  <div class="button">
    <cpn-header-vue
      title="button"
      name="按钮"
      description="用来做按钮点击"
    ></cpn-header-vue>
    <size-vue></size-vue>
    <type-vue></type-vue>
    <shape-vue></shape-vue>
    <plain-vue></plain-vue>
    <disabled-vue></disabled-vue>
    <icon-vue></icon-vue>
    <loading-vue></loading-vue>
    <slot-vue></slot-vue>
    <text-vue></text-vue>
  </div>
</template>

<script lang="ts" setup name="button">
/*
 * @Author: bughou
 * @Date: 2022-04-30 14:40:22
 * @Description: 创建一个button组件
 */
// 从下载的组件中导入函数
import { ref } from "vue";
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import sizeVue from "./cpn/size.vue";
import typeVue from "./cpn/type.vue";
import shapeVue from "./cpn/shape.vue";
import plainVue from "./cpn/plain.vue";
import iconVue from "./cpn/icon.vue";
import loadingVue from "./cpn/loading.vue";
import slotVue from "./cpn/slot.vue";
import disabledVue from "./cpn/disabled.vue";
import textVue from "./cpn/text.vue";
const loading = ref(false);
function handleClick() {
  loading.value = true;
  setTimeout(() => (loading.value = false), 2000);
}
</script>
<style scoped lang="less">
.button {
  .size {
    display: inline-block;
    > * {
      margin: 0 20px;
    }
  }
}
</style>
