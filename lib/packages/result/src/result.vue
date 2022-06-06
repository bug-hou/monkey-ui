<!-- bgResult -->
<template>
  <div class="mResult">
    <header>
      <slot name="header">
        <component :is="mapComponents[component]"></component>
      </slot>
    </header>
    <main>
      <slot name="title">
        <h1>{{ title }}</h1>
      </slot>
      <slot>
        <p>{{ content }}</p>
      </slot>
    </main>
    <footer>
      <slot name="footer"> </slot>
    </footer>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { withDefaults, defineProps } from "vue";
import {
  cryVue,
  palmVue,
  planetVue,
  prohibitVue,
  smallVue,
  ghostVue,
  cupVue
} from "../../../common/result";

const mapComponents = {
  cry: cryVue,
  palm: palmVue,
  planet: planetVue,
  prohibit: prohibitVue,
  small: smallVue,
  ghost: ghostVue,
  cup: cupVue
};

const props = withDefaults(
  defineProps<{
    title?: string;
    content?: string;
    component?:
      | "cry"
      | "palm"
      | "planet"
      | "prohibit"
      | "small"
      | "ghost"
      | "cup";
  }>(),
  {
    component: "cry"
  }
);
</script>
<style scoped lang="less">
.mResult {
  header {
    color: var(--m-result-color);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 80px;
    font-weight: bold;
  }
  main {
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    color: var(--back-color-result);
    h1 {
      font-size: 32px;
      font-weight: bold;
      color: var(--back-color-result-title);
    }
  }
  footer {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button {
    width: 100px;
    letter-spacing: 5px;
  }
}
</style>
