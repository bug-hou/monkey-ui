<template>
  <div
    class="m-vertualScroll"
    ref="vertucalScrollRef"
    :style="[
      { height: maxHeight },
      { width },
      { ['--m-vertual-scroll-height']: height + 'px' }
    ]"
  >
    <div
      class="m-vertual-scroll-contain"
      :style="[{ height: containHeight + 'px' }]"
    >
      <ul :style="{ transform: `translateY(${translateY}px)` }">
        <li v-for="item in showOptions" @click="clickHandle(item)">
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
import { defineProps, onMounted, ref } from "vue";
import { useScroll } from "../../../hooks";

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

const vertucalScrollRef = ref<HTMLElement>();

onMounted(() => {
  const bscroll = useScroll(vertucalScrollRef.value as any, {
    bounce: false
  });

  bscroll.on("scroll", ({ y }) => {
    settingOptions(Math.abs(y));
  });
});
settingOptions();
function settingOptions(y: number = props.start) {
  translateY.value = y;
  const minLen = Math.floor(y / props.height);
  const maxLen = Math.floor((y + props.maxHeight) / props.height);
  const len = maxLen - minLen;
  const options: any[] = [];
  for (let i = 0; i < len; i++) {
    options.push(props.options[minLen + i]);
  }
  showOptions.value = options;
}

function clickHandle(item) {
  emits("option", item);
}
</script>
<style scoped lang="less">
.m-vertualScroll {
  overflow: hidden;
  height: 500px;
  position: relative;
  li {
    width: 100%;
    height: var(--m-vertual-scroll-height);
    display: flex;
    align-items: center;
  }
}
</style>
