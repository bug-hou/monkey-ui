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
      <div class="size">
        <m-icon name="upload" size="mini"></m-icon>
        <m-icon name="upload"></m-icon>
        <m-icon name="upload" size="medium"></m-icon>
        <m-icon name="upload" size="big"></m-icon>
      </div>
      <div class="size">
        <m-icon
          type="success"
          :plain="false"
          name="upload"
          size="mini"
        ></m-icon>
        <m-icon type="success" :plain="false" name="upload"></m-icon>
        <m-icon
          type="success"
          :plain="false"
          name="upload"
          size="medium"
        ></m-icon>
        <m-icon type="success" :plain="false" name="upload" size="big"></m-icon>
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
        <m-icon name="upload" type="default"></m-icon>
        <m-icon name="upload" type="success"></m-icon>
        <m-icon name="upload" type="info"></m-icon>
        <m-icon name="upload" type="warning"></m-icon>
        <m-icon name="upload" type="error"></m-icon>
        <m-icon name="upload" type="primary"></m-icon>
        <m-icon name="upload" type="primary" color="pink"></m-icon>
      </div>
      <template #code>
        <pre v-highlight="typeCode"></pre>
      </template>
    </cpn-play-vue>
    <cpn-play-vue title="plain" description="图标透明，但是有背景哦">
      <div class="size">
        <m-icon name="upload" :plain="false" type="default"></m-icon>
        <m-icon name="upload" :plain="false" type="success"></m-icon>
        <m-icon name="upload" :plain="false" type="info"></m-icon>
        <m-icon name="upload" :plain="false" type="warning"></m-icon>
        <m-icon name="upload" :plain="false" type="error"></m-icon>
        <m-icon name="upload" :plain="false" type="primary"></m-icon>
        <m-icon
          name="upload"
          :plain="false"
          type="primary"
          color="pink"
        ></m-icon>
      </div>
      <template #code>
        <pre v-highlight="plainCode"></pre>
      </template>
    </cpn-play-vue>
    <div class="icons">
      <m-icon name="rocket"></m-icon>
      <m-icon name="upload"></m-icon>
      <m-icon name="separator"></m-icon>
      <m-icon name="collection"></m-icon>
      <m-icon name="file"></m-icon>
      <m-icon name="calendar"></m-icon>
      <m-icon name="error"></m-icon>
      <m-icon name="success"></m-icon>
      <m-icon name="info"></m-icon>
      <m-icon name="warning"></m-icon>
      <m-icon name="error"></m-icon>
      <m-icon name="error-empty"></m-icon>
      <m-icon name="warning-empty"></m-icon>
    </div>
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
const SizeCode = `<div class="size">
  <m-icon name="upload" size="mini"></m-icon>
  <m-icon name="upload"></m-icon>
  <m-icon name="upload" size="medium"></m-icon>
  <m-icon name="upload" size="big"></m-icon>
</div>
<div class="size">
  <m-icon type="success" :plain="false" name="upload" size="mini"></m-icon>
  <m-icon type="success" :plain="false" name="upload"></m-icon>
  <m-icon type="success" :plain="false" name="upload" size="medium"></m-icon>
  <m-icon type="success" :plain="false" name="upload" size="big"></m-icon>
</div>`;
const typeCode = `<div class="size">
  <m-icon name="upload" type="default"></m-icon>
  <m-icon name="upload" type="success"></m-icon>
  <m-icon name="upload" type="info"></m-icon>
  <m-icon name="upload" type="warning"></m-icon>
  <m-icon name="upload" type="error"></m-icon>
  <m-icon name="upload" type="primary"></m-icon>
  <m-icon name="upload" type="primary" color="pink"></m-icon>
</div>`;
const plainCode = `<div class="size">
  <m-icon name="upload" :plain="false" type="default"></m-icon>
  <m-icon name="upload" :plain="false" type="success"></m-icon>
  <m-icon name="upload" :plain="false" type="info"></m-icon>
  <m-icon name="upload" :plain="false" type="warning"></m-icon>
  <m-icon name="upload" :plain="false" type="error"></m-icon>
  <m-icon name="upload" :plain="false" type="primary"></m-icon>
  <m-icon
    name="upload"
    :plain="false"
    type="primary"
    color="pink"
  ></m-icon>
</div>`;
</script>
<style scoped lang="less">
.cpnIcon {
  .size {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
