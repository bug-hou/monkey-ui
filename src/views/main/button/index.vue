<template>
  <div class="button">
    <cpn-header-vue
      title="button"
      name="按钮"
      description="用来做按钮点击"
    ></cpn-header-vue>
    <cpn-play-vue
      title="size"
      description="以下四种供军选择mini，small(默认)，medium，big，当然你可以自定义css样式"
    >
      <m-button-group class="size">
        <m-button size="mini" type="success">小小按钮</m-button>
        <m-button size="small" type="error">小按钮</m-button>
        <m-button size="medium" type="primary">中等按钮</m-button>
        <m-button size="big" type="info">大大的按钮</m-button>
      </m-button-group>
      <template #code>
        <pre v-highlight="sizeCode"></pre>
      </template>
    </cpn-play-vue>
    <cpn-play-vue
      title="type"
      description="可以设置default(默认)，success，error，primary，info，warning"
    >
      <m-button-group class="type">
        <m-button>default</m-button>
        <m-button type="success">success</m-button>
        <m-button type="error">error</m-button>
        <m-button type="primary">primary</m-button>
        <m-button type="info">info</m-button>
        <m-button type="warning">warning</m-button>
      </m-button-group>
      <template #code>
        <pre v-highlight="typeCode"></pre>
      </template>
    </cpn-play-vue>
    <cpn-play-vue
      title="shape"
      description="可以设置rect(默认)，round，arc，circle"
    >
      <m-button-group class="type" shape="rect">
        <m-button>default</m-button>
        <m-button type="success">success</m-button>
        <m-button type="error">error</m-button>
        <m-button type="primary">primary</m-button>
        <m-button type="info">info</m-button>
        <m-button type="warning">warning</m-button>
      </m-button-group>
      <m-button-group class="type" shape="round">
        <m-button>default</m-button>
        <m-button type="success">success</m-button>
        <m-button type="error">error</m-button>
        <m-button type="primary">primary</m-button>
        <m-button type="info">info</m-button>
        <m-button type="warning">warning</m-button>
      </m-button-group>
      <m-button-group class="type" shape="arc">
        <m-button>default</m-button>
        <m-button type="success">success</m-button>
        <m-button type="error">error</m-button>
        <m-button type="primary">primary</m-button>
        <m-button type="info">info</m-button>
        <m-button type="warning">warning</m-button>
      </m-button-group>
      <m-button-group class="type" shape="circle">
        <m-button>D</m-button>
        <m-button type="success">S</m-button>
        <m-button type="error">E</m-button>
        <m-button type="primary">P</m-button>
        <m-button type="info">I</m-button>
        <m-button type="warning">W</m-button>
      </m-button-group>
      <template #code>
        <pre v-highlight="shapeCode"></pre>
      </template>
    </cpn-play-vue>
    <cpn-play-vue
      title="plain"
      description="设置plain为false将button组件变得不再朴素，并且你觉得这些太难看也可以自己传递color，hoverColor，borderColor，backgroundColor，hoverBackgroundColor"
    >
      <m-button-group :plain="false">
        <m-button>default</m-button>
        <m-button type="success">success</m-button>
        <m-button type="error">error</m-button>
        <m-button type="primary">primary</m-button>
        <m-button type="info">info</m-button>
        <m-button type="warning">warning</m-button>
        <m-button color="#40fafa" borderColor="#40fafa">warning</m-button>
      </m-button-group>
      <template #code>
        <pre v-highlight="plainCode"></pre>
      </template>
    </cpn-play-vue>
    <cpn-play-vue title="icon" description="当button遇到icon发送的火花">
      <m-button-group shape="circle">
        <m-button :plain="false" type="success">
          <m-icon name="m-upload" color="pink"></m-icon>
        </m-button>
        <m-button :plain="false" type="error">
          <m-icon name="m-upload"></m-icon>
        </m-button>
        <m-button :plain="false" type="info">
          <m-icon name="m-upload"></m-icon>
        </m-button>
        <m-button :plain="false" type="success">
          <m-icon name="m-upload"></m-icon>
        </m-button>
      </m-button-group>
    </cpn-play-vue>
  </div>
</template>

<script lang="ts" setup name="button">
/*
 * @Author: bughou
 * @Date: 2022-04-30 14:40:22
 * @Description: 创建一个button组件
 */
// 从下载的组件中导入函数
import {} from "vue";
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import cpnPlayVue from "../../../components/cpnPlay/cpnPlay.vue";
import { sizeCode, typeCode, shapeCode, plainCode } from "./doc";
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
