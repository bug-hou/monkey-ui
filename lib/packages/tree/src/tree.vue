<template>
  <label class="m-tree" @mousedown.prevent="downHandle">
    <input type="text" ref="inputRef" />
    <div class="m-tree-label"></div>
    <div class="m-tree-list" ref="listRef">
      <ul>
        <li v-for="item in options" :key="item[valueName]">
          <component
            :is="item.children ? treeChildVue : treeItemVue"
            :option="item"
            @expand="expandHandle"
            :level="0"
            :path="markInfo.path"
          ></component>
        </li>
      </ul>
    </div>
  </label>
</template>

<script lang="ts" setup name="m-tree">
/*
 * @Author: bughou
 * @Date: 2022-06-28 16:48:05
 * @Description: 创建一个m-tree组件
 */
// 从下载的组件中导入函数
import {
  ref,
  defineEmits,
  defineProps,
  provide,
  onMounted,
  reactive
} from "vue";
import { useScroll } from "../../../hooks";
import { computedPosition } from "../../../utils";

import treeChildVue from "./treeChild.vue";
import treeItemVue from "./treeItem.vue";
const props = withDefaults(
  defineProps<{
    options: any[];
    labelName?: string;
    valueName?: string;
  }>(),
  {
    labelName: "label",
    valueName: "value"
  }
);

const emits = defineEmits(["select"]);

provide("labelName", props.labelName);
provide("valueName", props.valueName);

const listRef = ref<HTMLElement>();
const inputRef = ref<HTMLElement>();

const markInfo = reactive({
  path: new WeakMap(),
  levels: new Map<number, any>()
});

const selectInfo = reactive({
  path: new WeakMap(),
  selectAll: new WeakMap(),
  levels: new Map<number, any>()
});

let scroll: any;

function downHandle(event: Event) {
  inputRef.value?.focus();
}

function expandHandle(level: number, option: any[], signal: boolean) {
  if (markInfo.levels.has(level)) {
    for (const l of markInfo.levels) {
      if (level <= l[0]) {
        markInfo.path.delete(l[1]);
      }
    }
  }
  console.log(signal);
  markInfo.levels.set(level, option);
  markInfo.path.set(option, signal);
  setTimeout(() => {
    scroll.refresh();
  }, 200);
}

onMounted(() => {
  scroll = useScroll(listRef.value as any, { bounce: false });
});
</script>
<style scoped lang="less">
@color: (rgb(239, 239, 245));
@shadowColor: (rgb(48, 170, 105));
.m-tree {
  position: relative;
  .m-tree-label {
    min-height: 38px;
    border: 0.0625rem solid @color;
    padding: 5px 8px;
    border-radius: 10px;
  }
  .m-tree-showValue {
    grid-gap: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    .m-tree-tag {
      height: 100%;
    }
  }
  input:focus ~ .m-tree-label {
    border-color: rgb(48, 170, 105);
    box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.2);
  }
  input {
    position: absolute;
    z-index: -999;
    left: -999px;
  }
  input ~ .m-tree-list {
    opacity: 1;
    max-height: 400px;
  }
  .m-tree-list {
    width: 100%;
    overflow: hidden;
    max-height: 0;
    position: absolute;
    top: 110%;
    overflow: hidden;
    left: 0;
    opacity: 0;
    border-radius: 0.625rem;
    box-shadow: 0 0.1875rem 0.375rem -0.25rem rgba(0, 0, 0, 0.12),
      0 0.375rem 1rem 0 rgba(0, 0, 0, 0.08),
      0 0.5625rem 1.75rem 0.5rem rgba(0, 0, 0, 0.05);
    background-color: #fff;
    ul {
      padding: 5px 0;
    }
  }
}
</style>
