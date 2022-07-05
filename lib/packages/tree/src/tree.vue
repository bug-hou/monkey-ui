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
            :level="0"
            :path="markInfo.path"
            @expand="expandHandle"
            @choose="chooseHandle"
            @transfer="transferHandle"
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
    separatist?: string;
  }>(),
  {
    labelName: "label",
    valueName: "value",
    separatist: "/"
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

const showLabel = reactive({
  labels: new Map<string, any>(),
  values: new Array<string>(),
  labelToValue: new Map<string, string>()
});

provide("hasMap", selectInfo.path);
provide("selectMap", selectInfo.selectAll);
let scroll: any;

function downHandle(event: Event) {
  inputRef.value?.focus();
}

function expandHandle(level: number, option: any, signal: boolean) {
  if (markInfo.levels.has(level)) {
    for (const l of markInfo.levels) {
      if (level <= l[0]) {
        markInfo.path.delete(l[1]);
      }
    }
  }

  markInfo.levels.set(level, option);
  markInfo.path.set(option, signal);
  setTimeout(() => {
    scroll.refresh();
  }, 200);
}

function chooseHandle(level: number, option: any) {
  processWeakMap(selectInfo.selectAll, option, level);
  if (selectInfo.path.get(option)) {
    selectInfo.path.set(option, false);
  }
}

function transferHandle(level: number, option: any) {
  processWeakMap(selectInfo.path, option, level);
}

function processWeakMap(
  map: WeakMap<any, boolean>,
  option: any,
  level: number
) {
  if (map.get(option)) {
    map.set(option, false);
    processChild(selectInfo.selectAll, option, false);
  } else {
    map.set(option, true);
    processChild(selectInfo.selectAll, option, true);
  }
  processSelectParent(level - 1);
  processHasParent(level - 1);
}

function processChild(
  map: WeakMap<any, boolean>,
  option: any,
  signal: boolean,
  values: string[] = []
) {
  if (Array.isArray(option.children) && option.children.length !== 0) {
    for (let o of option.children) {
      if (!o.disabled) {
        map.set(o, signal);
        values.push(o.value);
        processChild(map, o, signal, values);
      }
    }
  }
}

function processSelectParent(level: number) {
  while (level >= 0) {
    const option = markInfo.levels.get(level);
    if (option) {
      let i = 0;
      for (const o of option.children) {
        if (!o.disabled && !selectInfo.selectAll.get(o)) {
          break;
        }
        i++;
      }
      if (i === option.children.length) {
        selectInfo.selectAll.set(option, true);
      } else {
        selectInfo.selectAll.set(option, false);
      }
    }
    level--;
  }
}

function processHasParent(level: number) {
  while (level >= 0) {
    const option = markInfo.levels.get(level);
    if (option) {
      let i = 0;
      for (const o of option.children) {
        if (!o.disabled && selectInfo.selectAll.get(o)) {
          break;
        }
        i++;
      }
      if (i === option.children.length) {
        selectInfo.path.set(option, false);
      } else {
        selectInfo.path.set(option, true);
      }
    }
    level--;
  }
}
function processLable(level: number, curOption: string[]) {
  const labels = new Array<string>();
  labels.unshift(...curOption);
  while (level >= 0) {
    const option = markInfo.levels.get(level--);
    labels.unshift(option.value);
  }
  return labels.join(props.separatist);
}
function processAddLabel(level: number, curOption: string[]) {
  const value = processLable(level, curOption);
  showLabel.values.push(value);
  return value;
}

function processDelLabel(level: number, curOption: string[]) {
  const value = processLable(level, curOption);
  showLabel.values.splice(showLabel.values.indexOf(value), 1);
  return value;
}

onMounted(() => {
  scroll = useScroll(listRef.value as any, {
    bounce: false,
    scrollX: true,
    scrollY: true
  });
});
</script>
<style scoped lang="less">
@color: (rgb(239, 239, 245));
@shadowColor: (rgb(48, 170, 105));
.m-tree {
  position: relative;
  display: inline-block;
  .m-tree-label {
    width: 100%;
    min-height: 38px;
    border: 0.0625rem solid @color;
    padding: 5px 8px;
    border-radius: 10px;
  }
  .m-tree-showValue {
    width: 100%;
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
    min-width: 100%;
    overflow: hidden;
    max-height: 0;
    position: absolute;
    top: 110%;
    overflow: hidden;
    white-space: nowrap;
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
