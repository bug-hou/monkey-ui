<template>
  <div class="m-cascader">
    <div class="m-cascader-showValue">
      <p v-for="item in showValues">{{ item }}</p>
    </div>
    <div class="m-cascader-list">
      <cascader-list-vue
        v-for="(option, index) in showOptions"
        class="m-cascader-list-option"
        :index="index"
        :options="option"
        :select-index="activeMap.get(option) ?? []"
        :active-index="activeIndex[index]"
        :has-index="childrenMap.get(option) ?? []"
        @change="changeHandle"
        @show="showHandle"
        @hidden="hiddenHandle"
        @select="selectHandle"
        @cancel="cancelHandle"
      ></cascader-list-vue>
    </div>
  </div>
</template>

<script lang="ts" setup name="m-cascader">
/*
 * @Author: bughou
 * @Date: 2022-06-09 13:02:25
 * @Description: 创建一个m-cascader组件
 */
// 从下载的组件中导入函数
import { reactive, defineProps, ref, nextTick } from "vue";
import { Options } from "../config/type";

import cascaderListVue from "./cascaderList.vue";

const props = withDefaults(
  defineProps<{
    options: Options[];
    join?: string;
    multiple?: boolean;
  }>(),
  {
    join: "/",
    multiple: false
  }
);
const showOptions = reactive([props.options]);
const activeIndex = reactive<number[]>([]);
const showValues = reactive<string[]>([]);

const showLabels = reactive<string[]>([]);

const activeMap = ref(new WeakMap<object, number[]>());
const childrenMap = ref(new WeakMap<object, number[]>());

// 向showOPtions数组中添加值，并且同步更新activeIndex
function changeHandle(option: Options[], index: number, parentIndex: number) {
  setTimeout(() => {
    showOptions.splice(index + 1, showOptions.length);
    activeIndex.splice(index, activeIndex.length);
    showOptions.push(option);
    activeIndex.push(parentIndex);
  }, 100);
}

function showHandle(option: Options, index: number, parentIndex: number) {
  processShow(index, option);

  let key = showOptions[index];
  let values = activeMap.value.get(key) ?? [];
  if (props.multiple) {
    values.push(parentIndex);
  } else {
    values[0] = parentIndex;
  }
  activeMap.value.set(key, values);
  while (index !== 0 && values.length === key.length) {
    key = showOptions[index - 1];
    values = activeMap.value.get(key) ?? [];
    values.push(activeIndex[index - 1]);
    activeMap.value.set(key, values);
    index--;
  }
  while (index !== 0) {
    key = showOptions[index - 1];
    values = childrenMap.value.get(key) ?? [];
    if (!values.includes(activeIndex[index - 1])) {
      values.push(activeIndex[index - 1]);
      childrenMap.value.set(key, values);
    }
    index--;
  }
}

function hiddenHandle(option: Options, index: number, parentIndex: number) {
  processShow(index, option, (showValue, showLabel) => {
    showValues.splice(showValues.indexOf(showValue), 1);
    showLabels.splice(showLabels.indexOf(showLabel), 1);
  });

  let key = showOptions[index];

  let values = activeMap.value.get(key) ?? [];

  let curIndex = index;
  while (curIndex !== -1) {
    if (props.multiple) {
      values.splice(
        values.indexOf(
          curIndex === index ? parentIndex : activeIndex[curIndex - 1]
        ),
        1
      );
      activeMap.value.set(key, values);
      if (
        values.length === (curIndex === index ? key.length - 1 : key.length)
      ) {
        key = showOptions[curIndex - 1];
        values = activeMap.value.get(key) ?? [];
        curIndex--;
      } else {
        break;
      }
    } else {
      activeMap.value.delete(key);
      if (
        values.length === (curIndex === index ? key.length - 1 : key.length)
      ) {
        key = showOptions[curIndex - 1];
        values = activeMap.value.get(key) ?? [];
        curIndex--;
      } else {
        break;
      }
    }
  }

  key = showOptions[index];

  values = activeMap.value.get(key) ?? [];
  let childrenValue = activeMap.value.get(key) ?? [];
  while (index !== 0 && values.length === 0 && childrenValue.length === 0) {
    key = showOptions[index - 1];
    values = childrenMap.value.get(key) ?? [];
    values.splice(values.indexOf(childrenMap[index - 1]), 1);
    if (props.multiple) {
      childrenValue = activeMap.value.get(key) ?? [];
      childrenMap.value.set(key, values);
    } else {
      childrenMap.value.delete(key);
    }
    index--;
  }
}

function rootSearchAdd(
  parentOption: Options,
  index: number,
  label: string,
  value: string
) {
  const name = label + (parentOption as any).children[index].label;
  const vvalue = value + (parentOption as any).children[index].value;
  if (!showValues.includes(vvalue) && props.multiple) {
    showValues.push(vvalue);
    showLabels.push(name);
  } else {
    showLabels[0] = name;
    showValues[0] = vvalue;
  }

  const values = activeMap.value.get(parentOption.children as any) ?? [];
  if (!values.includes(index)) {
    values.push(index);
  }
  activeMap.value.set(parentOption.children as any, values);
  if (Array.isArray((parentOption.children as any)[index].children)) {
    const childrenValues =
      childrenMap.value.get(parentOption.children as any) ?? [];
    if (!childrenValues.includes(index)) {
      childrenValues.push(index);
    }
    childrenMap.value.set(parentOption.children as any, childrenValues);
  }
}

function rootSearchSub(
  parentOption: Options,
  index: number,
  label: string,
  value: string
) {
  const name = label + (parentOption as any).children[index].label;
  const vvalue = value + (parentOption as any).children[index].value;
  if (props.multiple) {
    showValues.splice(showValues.indexOf(name), 1);
    showLabels.splice(showLabels.indexOf(vvalue), 1);
  } else {
    showLabels[0] = name;
    showValues[0] = vvalue;
  }

  activeMap.value.delete(parentOption.children as any);
  childrenMap.value.delete(parentOption.children as any);
}

function selectHandle(
  option: Options,
  index: number,
  parentIndex: number,
  label?: string,
  showValue?: string
) {
  if (!label) {
    const values = activeMap.value.get(showOptions[index]) ?? [];
    const childrenValues = childrenMap.value.get(showOptions[index]) ?? [];
    if (!values.includes(parentIndex)) {
      values.push(parentIndex);
    }
    if (!childrenValues.includes(parentIndex)) {
      childrenValues.push(parentIndex);
    }
    activeMap.value.set(showOptions[index], values);
    childrenMap.value.set(showOptions[index], childrenValues);

    processShow(index, option);
    label = processPrefix(index);
    showValue = processPrefix(index, "value");
  }
  label += option.label + props.join;

  const values = activeMap.value.get(option) ?? [];

  const children = option.children as any;
  for (let i = 0; i < children.length; i++) {
    if (!values.includes(i)) {
      const o = children[i];
      rootSearchAdd(option, i, label, showValue as string);
      if (Array.isArray(o.children) && o.children.length !== 0) {
        selectHandle(o, index, parentIndex, label, showValue);
      }
    }
  }
  activeMap.value.set(option, values);
}
function cancelHandle(
  option: Options,
  index: number,
  parentIndex: number,
  label?: string,
  showValue?: string
) {
  if (!label) {
    const value = activeMap.value.get(showOptions[index]) ?? [];
    value.splice(value.indexOf(parentIndex), 1);
    activeMap.value.set(showOptions[index], value);
    const childValue = childrenMap.value.get(showOptions[index]) ?? [];
    childValue.splice(childValue.indexOf(parentIndex), 1);
    childrenMap.value.set(showOptions[index], childValue);

    label = processPrefix(index);
    showValue = processPrefix(index, "value");
  }
  showValues.splice(showValues.indexOf(label + option.label), 1);

  label += option.label + props.join;
  showValue += option.value + props.join;

  const children = option.children as any;
  for (let i = 0; i < children.length; i++) {
    const o = children[i];
    if (Array.isArray(o.children) && o.children.length !== 0) {
      cancelHandle(o, index, parentIndex, label, showValue);
    } else {
      rootSearchSub(option, index, label, showValue as string);
    }
  }
}
function processPrefix(index: number, key: "label" | "value" = "label") {
  let showValue = "";
  for (let i = 0; i < index; i++) {
    showValue += showOptions[i][activeIndex[i]][key] + props.join;
  }
  return showValue;
}
function processShow(
  index: number,
  option: Options,
  callBack: (showValue: string, showLabel: string) => void = (
    showValue,
    showLabel
  ) => {
    if (props.multiple) {
      if (!showValues.includes(showValue)) {
        showValues.push(showValue);
        showLabels.push(showLabel);
      }
    } else {
      showValues[0] = showValue;
      showLabels[0] = showLabel;
    }
  }
) {
  let showValue = processPrefix(index, "value");
  let showLabel = processPrefix(index, "label");
  showValue += option.value;
  showLabel += option.label;
  callBack(showValue, showLabel);
}
</script>
<style scoped lang="less">
@color: (rgb(239, 239, 245));
.m-cascader {
  position: relative;
  .m-cascader-showValue {
    min-height: 38px;
    display: flex;
    border: 1px solid @color;
    padding: 5px 10px;
    border-radius: 10px;
    p {
      padding: 0px 10px;
      margin-right: 10px;
      background-color: @color;
      border: 1px solid #6666;
    }
    &:hover {
      border-color: #0ff;
    }
  }
  .m-cascader-list {
    position: absolute;
    top: 110%;
    left: 0;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    background-color: #fafbfc;
    display: inline-flex;
    .m-cascader-list-option {
      border-right: 1px solid @color;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
