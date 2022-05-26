<!-- bgTagInput -->
<template>
  <div class="mTagInput">
    <m-input
      class="mTagInput-item"
      size="mini"
      placeholder="+ Tag"
      v-model="value"
      @keydown.enter="enterHandler"
    ></m-input>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { ref, withDefaults } from "vue";

// 自定义方法引入

// 自定义组件引入
import mInput from "../../input/src/input.vue";

const emits = defineEmits(["change"]);
const value = ref("");
const enterHandler = () => {
  emits("change", value.value);
  value.value = "";
};
</script>
<style scoped lang="less">
.mTagInput {
  display: inline-block;
  .mTagInput-item {
    width: 80px;
    height: 24px;
  }
}
</style>
