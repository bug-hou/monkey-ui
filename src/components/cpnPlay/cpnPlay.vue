<!-- base -->
<template>
  <div class="base">
    <header>
      <h1 :id="title">{{ initialCapital(title) }}属性</h1>
      <div class="descriptor" v-description="description"></div>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="code"></slot>
    </footer>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { withDefaults, defineProps, Directive } from "vue";
import { initialCapital } from "../../utils";
const props = withDefaults(
  defineProps<{
    title: string;
    description: string;
  }>(),
  {}
);
const vDescription: Directive = {
  mounted(el: HTMLElement, binding) {
    const reg = /[a-z]*/gi;
    el.innerHTML = (binding.value as string).replace(
      reg,
      (match) => match && `<code>${match}</code>`
    );
  }
};
</script>
<style scoped lang="less">
.base {
  margin: 2rem 0;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  width: 100%;
  max-width: 35rem;
  header {
    width: 100%;
    border-bottom: 1px solid #dcdfe6;
    padding: 5px 10px;
    box-sizing: border-box;
    h1 {
      font-size: 25px;
    }
    p {
      margin-top: 10px;
      font-size: 14px;
    }
    .descriptor {
      margin: 10px 0;
      letter-spacing: 2px;
      font-size: 14px;
      color: #40444c;
    }
  }
  main {
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
  }
  footer{
    border-top: 1px solid #dcdfe6;
  }
}
</style>
