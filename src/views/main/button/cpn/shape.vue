<template>
  <cpn-play-vue
    title="shape"
    :code="shapeCode"
    description="可以设置rect(默认)，round，arc，circle"
  >
    <m-button-group class="type" shape="rect">
      <m-button>default</m-button>
      <p class="gap"></p>
      <m-button type="success">success</m-button>
      <p class="gap"></p>
      <m-button type="error">error</m-button>
      <p class="gap"></p>
      <m-button type="primary">primary</m-button>
      <p class="gap"></p>
      <m-button type="info">info</m-button>
      <p class="gap"></p>
      <m-button type="warning">warning</m-button>
    </m-button-group>
    <br />
    <br />
    <m-button-group class="type" shape="round">
      <m-button>default</m-button>
      <p class="gap"></p>
      <m-button type="success">success</m-button>
      <p class="gap"></p>
      <m-button type="error">error</m-button>
      <p class="gap"></p>
      <m-button type="primary">primary</m-button>
      <p class="gap"></p>
      <m-button type="info">info</m-button>
      <p class="gap"></p>
      <m-button type="warning">warning</m-button>
    </m-button-group>
    <br />
    <br />
    <m-button-group class="type" shape="arc">
      <m-button>default</m-button>
      <p class="gap"></p>
      <m-button type="success">success</m-button>
      <p class="gap"></p>
      <m-button type="error">error</m-button>
      <p class="gap"></p>
      <m-button type="primary">primary</m-button>
      <p class="gap"></p>
      <m-button type="info">info</m-button>
      <p class="gap"></p>
      <m-button type="warning">warning</m-button>
    </m-button-group>
    <br />
    <br />
    <m-button-group class="type" shape="circle">
      <m-button>D</m-button>
      <p class="gap"></p>
      <m-button type="success">S</m-button>
      <p class="gap"></p>
      <m-button type="error">E</m-button>
      <p class="gap"></p>
      <m-button type="primary">P</m-button>
      <p class="gap"></p>
      <m-button type="info">I</m-button>
      <p class="gap"></p>
      <m-button type="warning">W</m-button>
    </m-button-group>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="buttonShape">
/*
 * @Author: bughou
 * @Date: 2022-05-06 16:30:46
 * @Description: 创建一个buttonShape组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { shapeCode } from "../doc";
</script>
<style scoped lang="less">
.gap {
  width: 20px;
}
</style>
