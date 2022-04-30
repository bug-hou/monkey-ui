<template>
  <div class="button">
    <cpn-header-vue
      title="button"
      name="按钮"
      description="用来做按钮点击"
    ></cpn-header-vue>
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
        <div
          v-pre
          v-text="
            <m-button-group class=&quot;type&quot;>
              <m-button>default</m-button>
              <m-button type=&quot;success&quot;>success</m-button>
              <m-button type=&quot;error&quot;>error</m-button>
              <m-button type=&quot;primary&quot;>primary</m-button>
              <m-button type=&quot;info&quot;>info</m-button>
              <m-button type=&quot;warning&quot;>warning</m-button>
            </m-button-group>
          "
        ></div>
      </template>
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
</script>
<style scoped lang="less">
.button {
}
</style>
