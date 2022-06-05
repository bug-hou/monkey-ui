<template>
  <cpn-play-vue
    :code="loadingCode"
    title="loading"
    description="一个好的button少不了loading状态，目前来说只有7种short(默认)，loop，top，grow，slow，deep，long，"
  >
    <m-button-group :plain="false" shape="round">
      <m-button @click="handleClick" :loading="loading" loadingName="loop">
        点一下-loop
      </m-button>
      <p class="gap"></p>
      <m-button @click="handleClick" :loading="loading" type="error">
        点我呀-short
      </m-button>
      <p class="gap"></p>
      <m-button
        @click="handleClick"
        :loading="loading"
        type="primary"
        loadingName="grow"
      >
        我也行-grow
      </m-button>
      <p class="gap"></p>
      <m-button
        @click="handleClick"
        :loading="loading"
        type="success"
        loadingName="slow"
      >
        我有点慢-slow
      </m-button>
    </m-button-group>
    <br />
    <br />
    <m-button-group :plain="false" shape="round">
      <m-button @click="handleClick" :loading="loading" loadingName="deep"
        >看我-deep</m-button
      >
      <p class="gap"></p>
      <m-button
        @click="handleClick"
        :loading="loading"
        type="error"
        loadingName="top"
      >
        我在上面-top
      </m-button>
      <p class="gap"></p>
      <m-button
        @click="handleClick"
        :loading="loading"
        type="primary"
        loadingName="long"
      >
        我长-long
      </m-button>
      <p class="gap"></p>
      <m-button
        @click="handleClick"
        :loading="loading"
        type="success"
        loadingName="short"
      >
        两秒就无-short
      </m-button>
    </m-button-group>
    <template #code>
      <pre v-highlight="loadingCode"></pre>
    </template>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="loading">
/*
 * @Author: bughou
 * @Date: 2022-05-06 16:35:00
 * @Description: 创建一个loading组件
 */
// 从下载的组件中导入函数
import { ref } from "vue";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { loadingCode } from "../doc";
const loading = ref(false);
function handleClick() {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
}
</script>
<style scoped lang="less">
.gap {
  display: inline-block;
  width: 10px;
}
</style>
