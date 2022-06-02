<template>
  <div class="button">
    <cpn-header-vue
      title="button"
      name="按钮"
      description="用来做按钮点击"
    ></cpn-header-vue>
    <div class="layout">
      <medium-vue></medium-vue>
      <type-vue></type-vue>
      <dot-vue></dot-vue>
      <add-vue></add-vue>
    </div>
  </div>
</template>

<script lang="ts" setup name="button">
/*
 * @Author: bughou
 * @Date: 2022-04-30 14:40:22
 * @Description: 创建一个button组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import mediumVue from "./cpn/medium.vue";
import typeVue from "./cpn/type.vue";
import dotVue from "./cpn/dot.vue";
import addVue from "./cpn/add.vue";
// import sizeVue from "./cpn/size.vue";
// import typeVue from "./cpn/type.vue";
// import shapeVue from "./cpn/shape.vue";
// import plainVue from "./cpn/plain.vue";
// import iconVue from "./cpn/icon.vue";
// import loadingVue from "./cpn/loading.vue";
// import slotVue from "./cpn/slot.vue";
// import disabledVue from "./cpn/disabled.vue";
// import textVue from "./cpn/text.vue";
</script>
<style scoped lang="less">
.button {
  width: 100%;
  .size {
    display: inline-block;
    > * {
      margin: 0 20px;
    }
  }
}
</style>
