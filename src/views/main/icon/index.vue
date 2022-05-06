<template>
  <div class="cpnIcon">
    <cpn-header-vue
      name="图标"
      title="icon"
      description="代替图片显示"
    ></cpn-header-vue>
    <size-vue></size-vue>
    <type-vue></type-vue>
    <icons-vue></icons-vue>
  </div>
</template>

<script lang="ts" setup name="cpnIcon">
/*
 * @Author: bughou
 * @Date: 2022-05-01 20:50:47
 * @Description: 创建一个cpnIcon组件
 */
// 从下载的组件中导入函数
import {} from "vue";
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import typeVue from "./cpn/type.vue";
import sizeVue from "./cpn/size.vue";
import iconsVue from "./cpn/icons.vue";
</script>
<style scoped lang="less">
.cpnIcon {
  .size {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .icons {
    padding-bottom: 50px;
    width: 100%;
    max-width: 40rem;
    box-sizing: border-box;
    .iconGroup {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      justify-items: center;
      align-items: center;
      grid-template-rows: repeat(4, 40px);
    }
  }
}
</style>
