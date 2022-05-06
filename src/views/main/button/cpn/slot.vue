<template>
  <cpn-play-vue
    title="slot"
    :code="slotCode"
    description="同时使用icon和loading此时要使用插槽(插槽名:icon)"
  >
    <m-button-group :plain="false" shape="round">
      <m-button @click="handleClick" :loading="loading">
        <template #icon>
          <m-icon name="m-upload"></m-icon>
        </template>
        点一下才有
      </m-button>
      <m-button @click="handleClick" :loading="loading" type="error">
        <template #icon>
          <m-icon name="m-upload"></m-icon>
        </template>
        点我也可以
      </m-button>
      <m-button @click="handleClick" :loading="loading" type="primary">
        <template #icon>
          <m-icon name="m-upload"></m-icon>
        </template>
        也可以点我
      </m-button>
    </m-button-group>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="slot">
/*
 * @Author: bughou
 * @Date: 2022-05-06 16:39:10
 * @Description: 创建一个slot组件
 */
// 从下载的组件中导入函数
import { ref } from "vue";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { slotCode } from "../doc";
const loading = ref(false);
function handleClick() {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
}
</script>
<style scoped lang="less">
.slot {
}
</style>
