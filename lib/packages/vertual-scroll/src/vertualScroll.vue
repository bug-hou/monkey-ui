<template>
  <div
    class="m-vertualScroll scroll"
    @scroll="scrollHandle"
    :style="[
      { height: maxHeight + 'px' },
      { width: width + 'px' },
      { ['--m-vertual-scroll-height']: height + 'px' }
    ]"
  >
    <div
      class="m-vertual-scroll-contain"
      :style="[{ height: containHeight + 'px' }]"
    >
      <ul :style="{ transform: `translateY(${translateY}px)` }">
        <li
          v-for="(item, index) in showOptions"
          @click="clickHandle(item, index)"
        >
          <slot :value="item">{{ labelName ? item[labelName] : item }}</slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup name="vetualScroll">
/*
 * @Author: bughou
 * @Date: 2022-06-15 13:52:12
 * @Description: 创建一个vertualScroll组件
 */
// 从下载的组件中导入函数
import { defineProps, ref } from "vue";

const props = withDefaults(
  defineProps<{
    options: any[];
    height?: number;
    width?: number;
    gap?: number;
    maxHeight?: number;
    start?: number;
    labelName?: string;
    labelValue?: string;
  }>(),
  {
    start: 0,
    height: 34,
    gap: 5,
    maxHeight: 500,
    width: 200
  }
);

const emits = defineEmits(["option"]);

const containHeight = props.options.length * props.height;

const translateY = ref(0);

const showOptions = ref<any[]>([]);

function scrollHandle(event) {
  const y = event.target.scrollTop;
  translateY.value = Math.abs(y);
  settingOptions(Math.abs(y));
}
settingOptions();
function settingOptions(y: number = props.start) {
  const minLen = Math.floor(y / props.height);
  const maxLen = Math.ceil((y + props.maxHeight) / props.height);
  const len = maxLen - minLen;
  const options: any[] = [];
  for (let i = 0; i < len; i++) {
    if (minLen + i < props.options.length) {
      options.push(props.options[minLen + i]);
    }
  }
  showOptions.value = options;
}

function clickHandle(item, index) {
  emits("option", item, index);
}
</script>
<style scoped lang="less">
.m-vertualScroll {
  overflow: auto;
  position: relative;
  .m-vertual-scroll-contain {
    padding: 0;
  }
  li {
    width: 100%;
    height: var(--m-vertual-scroll-height);
    display: flex;
    align-items: center;
  }
}
</style>
