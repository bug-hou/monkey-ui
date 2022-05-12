<!-- bg-collapse -->
<template>
  <div class="bgCollapse">
    <collapse-title-vue class="title" :isExtension="false" :isHeader="true">
      <slot name="title">
        {{ title }}
      </slot>
    </collapse-title-vue>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { onMounted, provide, withDefaults, defineProps } from "vue";
import collapseTitleVue from "./collapseTitle.vue";

// 自定义方法引入
import { collapseMitt } from "../../../utils";

const emits = defineEmits(["change"]);

const props = withDefaults(
  defineProps<{
    title: string;
    accordion?: boolean;
  }>(),
  { accordion: false }
);
const currentKey = [];
provide("accordion", props.accordion);
collapseMitt.on("open", (key) => {
  currentKey.push(key);
  emits("change", currentKey);
});
collapseMitt.on("close", (key) => {
  currentKey.splice(currentKey.indexOf(key), 1);
  emits("change", currentKey);
});
onMounted(() => {
  collapseMitt.off("*");
});
</script>
<style scoped lang="less">
.bgCollapse {
  width: 600px;
}
.title {
  font-size: 24px;
  font-weight: bold;
}
</style>
