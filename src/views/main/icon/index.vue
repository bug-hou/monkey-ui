<template>
  <div class="cpnIcon">
    <cpn-header-vue
      name="图标"
      title="icon"
      description="代替图片显示"
    ></cpn-header-vue>
    <cpn-play-vue
      title="size"
      description="图标大小small(默认)，mini，medium，big"
    >
      <div class="size" style="margin-bottom: 20px">
        <m-icon name="m-upload" size="mini"></m-icon>
        <m-icon name="m-upload"></m-icon>
        <m-icon name="m-upload" size="medium"></m-icon>
        <m-icon name="m-upload" size="big"></m-icon>
      </div>
      <template #code>
        <pre v-highlight="SizeCode"></pre>
      </template>
    </cpn-play-vue>
    <cpn-play-vue
      title="type"
      description="图标类型default(默认)，success，info，error，warning，primary或者自定义通过color"
    >
      <div class="size">
        <m-icon name="m-upload" type="default"></m-icon>
        <m-icon name="m-upload" type="success"></m-icon>
        <m-icon name="m-upload" type="info"></m-icon>
        <m-icon name="m-upload" type="warning"></m-icon>
        <m-icon name="m-upload" type="error"></m-icon>
        <m-icon name="m-upload" type="primary"></m-icon>
        <m-icon name="m-upload" type="primary" color="pink"></m-icon>
      </div>
      <template #code>
        <pre v-highlight="typeCode"></pre>
      </template>
    </cpn-play-vue>
    <cpn-play-vue
      class="icons"
      title="icons"
      description="你可以直接使用iconfont中的图标，将name赋值给m-icon中的name，但是一定要在你的文件中引用该图标"
    >
      <m-icon-group class="iconGroup">
        <m-icon name="m-rocket"></m-icon>
        <m-icon name="m-upload"></m-icon>
        <m-icon name="m-separator"></m-icon>
        <m-icon name="m-collection"></m-icon>
        <m-icon name="m-file"></m-icon>
        <m-icon name="m-calendar"></m-icon>
        <m-icon name="m-error"></m-icon>
        <m-icon name="m-success"></m-icon>
        <m-icon name="m-info"></m-icon>
        <m-icon name="m-warning"></m-icon>
        <m-icon name="m-error"></m-icon>
        <m-icon name="m-error-empty"></m-icon>
        <m-icon name="m-warning-empty"></m-icon>
        <m-icon name="m-info-empty"></m-icon>
        <m-icon name="m-success-empty"></m-icon>
        <m-icon name="m-wrong"></m-icon>
        <m-icon name="m-plus"></m-icon>
        <m-icon name="m-reduce"></m-icon>
        <m-icon name="m-ellipsis"></m-icon>
        <m-icon name="m-music"></m-icon>
        <m-icon name="m-star"></m-icon>
        <m-icon name="m-select"></m-icon>
        <m-icon name="m-rect"></m-icon>
        <m-icon name="m-left"></m-icon>
        <m-icon name="m-right"></m-icon>
        <m-icon name="m-loading"></m-icon>
        <m-icon name="m-delete"></m-icon>
        <m-icon name="m-show"></m-icon>
        <m-icon name="m-aafter"></m-icon>
        <m-icon name="m-after"></m-icon>
        <m-icon name="m-front"></m-icon>
        <m-icon name="m-ffront"></m-icon>
        <m-icon name="m-loader"></m-icon>
      </m-icon-group>
    </cpn-play-vue>
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
import cpnPlayVue from "../../../components/cpnPlay/cpnPlay.vue";
import { SizeCode, typeCode } from "./doc";
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
