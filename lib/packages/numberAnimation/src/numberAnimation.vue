<template>
  <div class="m-number-animation" ref="numberAnimationRef">
    <p v-if="effect === 'change'">{{ displayedValue }}</p>
    <div v-else>
      <ul class="m-number-animation-scroll">
        <scroll-vue
          :value="+String(to).charAt(index)"
          v-for="(item, index) in scrollValue"
        ></scroll-vue>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup name="m-number-animation">
/*
 * @Author: bughou
 * @Date: 2022-05-29 17:12:38
 * @Description: 创建一个m-number-animation组件
 */
// 从下载的组件中导入函数
import { ref, defineProps, Ref, watch } from "vue";
import { useChange } from "../hooks/changeAnimation";
import scrollVue from "./scroll.vue";
const props = withDefaults(
  defineProps<{
    to: number;
    from: number;
    effect?: "scroll" | "change";
    active?: boolean;
  }>(),
  {
    effect: "change",
    active: true
  }
);

const numberAnimationRef = ref<HTMLElement>();
const { from, to } = props;
let displayedValue: Ref<number> = ref(from);
let scrollValue = ref<number[]>(new Array(String(to).length).fill(0));
if ((props.effect = "change")) {
  watch(
    () => props.active,
    (newValue) => {
      if (newValue) {
        useChange(from, to, 2000, displayedValue);
      }
    },
    {
      immediate: true
    }
  );
}
</script>
<style scoped lang="less">
.m-number-animation {
  .m-number-animation-scroll {
    display: flex;
    overflow: hidden;
    height: 24px;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 5px;
    line-height: 24px;
  }
}
</style>
