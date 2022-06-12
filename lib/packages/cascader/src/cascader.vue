<template>
  <label class="m-cascader">
    <div class="m-cascader-showValue" @mousedown.prevent="a">
      <m-tag class="m-cascader-tag" v-for="item in showLabels">{{
        item
      }}</m-tag>
    </div>
    <input type="text" ref="inputRef" />
    <transition name="cascader-transition">
      <div class="m-cascader-list" @mousedown="a">
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
    </transition>
  </label>
</template>

<script lang="ts" setup name="m-cascader">
/*
 * @Author: bughou
 * @Date: 2022-06-09 13:02:25
 * @Description: 创建一个m-cascader组件
 */
// 从下载的组件中导入函数
import { reactive, defineProps, ref, watch, onMounted } from "vue";
import { Options } from "../config/type";

import mTag from "../../tag/src/tag.vue";

import cascaderListVue from "./cascaderList.vue";

const props = withDefaults(
  defineProps<{
    options: Options[];
    join?: string;
    multiple?: boolean;
    modelValue?: string | string[];
    checked?: boolean;
  }>(),
  {
    join: "/",
    multiple: false,
    checked: true
  }
);

const emits = defineEmits(["update:modelValue"]);

const showOptions = reactive([props.options]);
const activeIndex = reactive<number[]>([]);
const showValues = reactive<string[]>(
  Array.isArray(props.modelValue)
    ? props.modelValue
    : props.modelValue
    ? [props.modelValue]
    : []
);

const showLabels = reactive<string[]>([]);

const activeMap = ref(new WeakMap<object, number[]>());
const childrenMap = ref(new WeakMap<object, number[]>());
const inputRef = ref<HTMLInputElement>();

watch(showValues, (newValue) => {
  emits("update:modelValue", newValue);
});

function a() {
  inputRef.value?.focus();
}

onMounted(() => {
  if (props.checked) {
    a();
  }
});

parseModelValue();

function parseModelValue() {
  const models: string[] = showValues;
  for (let i = 0; i < models.length; i++) {
    if (props.multiple) {
      processeInitialValue(models[i]);
    } else {
      processeInitialValue(models[i]);
      break;
    }
  }
}

function processeInitialValue(value: string) {
  const valuess = value.split(props.join);
  let options = props.options;
  let indexs: number[] = [];
  let optionss: Options[] = [];
  let label = "";
  for (let i = 0; i < valuess.length; i++) {
    for (let j = 0; j < options.length; j++) {
      if (options[j].value === valuess[i]) {
        label += options[j].label + props.join;
        optionss.push(options[j]);
        indexs.push(j);
        if (i === valuess.length - 1) {
          const activeValues = activeMap.value.get(options) ?? [];
          goHeavy(activeValues, j);
          activeMap.value.set(options, activeValues);
          showLabels.push(label.slice(0, -1));
          break;
        }
        const childrenValue = childrenMap.value.get(options) ?? [];
        goHeavy(childrenValue, j);
        childrenMap.value.set(options, childrenValue);
        options = options[j].children ?? [];
        break;
      }
    }
  }
  while (indexs.length !== 0) {
    const key = optionss.pop();
    const index = indexs.pop();
    const value = activeMap.value.get(key as Options) ?? [];
    if (value.length === key?.children?.length) {
      goHeavy(value, index);
      activeMap.value.set(key, value);
    } else {
      break;
    }
  }
}

// 向showOPtions数组中添加值，并且同步更新activeIndex
function changeHandle(option: Options[], index: number, parentIndex: number) {
  showOptions.splice(index + 1, showOptions.length);
  activeIndex.splice(index, activeIndex.length);
  showOptions.push(option);
  activeIndex.push(parentIndex);
}

function showHandle(
  option: Options,
  index: number,
  parentIndex: number,
  children = true
) {
  if (children) {
    console.log("flksdjfkl");
    processShow(index, option);
  }

  let key = showOptions[index];
  let values = activeMap.value.get(key) ?? [];
  if (props.multiple) {
    goHeavy(values, parentIndex);
  } else {
    activeMap.value = new WeakMap<object, number[]>();
    childrenMap.value = new WeakMap<object, number[]>();
    values[0] = parentIndex;
  }
  activeMap.value.set(key, values);
  while (index !== 0 && values.length === key.length) {
    key = showOptions[index - 1];
    values = activeMap.value.get(key) ?? [];
    goHeavy(values, activeIndex[index - 1]);
    activeMap.value.set(key, values);
    index--;
  }
  while (index !== 0) {
    key = showOptions[index - 1];
    values = childrenMap.value.get(key) ?? [];
    goHeavy(values, activeIndex[index - 1]);
    childrenMap.value.set(key, values);
    index--;
  }
}

function hiddenHandle(
  option: Options,
  index: number,
  parentIndex: number,
  isChldren = true
) {
  processShow(index, option, (showValue, showLabel) => {
    showValues.splice(showValues.indexOf(showValue), 1);
    showLabels.splice(showLabels.indexOf(showLabel), 1);
  });

  let key = showOptions[isChldren ? index : index - 1];
  if (!key) {
    return;
  }

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

  values = childrenMap.value.get(key) ?? [];
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
  if (props.multiple) {
    goHeavy(showValues, vvalue);
    goHeavy(showLabels, name);
    // if (!Array.isArray((parentOption as any).children[index].children)) {
    //   goHeavy(showValues, vvalue);
    //   goHeavy(showLabels, name);
    // }
  } else {
    showLabels[0] = name;
    showValues[0] = vvalue;
  }

  const values = activeMap.value.get(parentOption.children as any) ?? [];
  goHeavy(values, index);
  activeMap.value.set(parentOption.children as any, values);
  if (Array.isArray((parentOption.children as any)[index].children)) {
    const childrenValues =
      childrenMap.value.get(parentOption.children as any) ?? [];
    goHeavy(childrenValues, index);
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
    showValues.splice(showValues.indexOf(vvalue), 1);
    showLabels.splice(showLabels.indexOf(name), 1);
  } else {
    showLabels[0] = name;
    showValues[0] = vvalue;
  }
}

function selectHandle(
  option: Options,
  index: number,
  parentIndex: number,
  label?: string,
  showValue?: string
) {
  if (!props.multiple) {
    return;
  }
  if (!label) {
    const values = activeMap.value.get(showOptions[index]) ?? [];
    const childrenValues = childrenMap.value.get(showOptions[index]) ?? [];
    goHeavy(values, parentIndex);
    goHeavy(childrenValues, parentIndex);
    activeMap.value.set(showOptions[index], values);
    childrenMap.value.set(showOptions[index], childrenValues);

    processShow(index, option);
    label = processPrefix(index);
    showValue = processPrefix(index, "value");

    // 向上通知我们选中了
    showHandle(option, index, parentIndex, false);
  }
  label += option.label + props.join;
  showValue += option.value + props.join;

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
  if (!props.multiple) {
    return;
  }
  activeMap.value.delete(option.children as any);
  childrenMap.value.delete(option.children as any);
  if (!label) {
    const value = activeMap.value.get(showOptions[index]) ?? [];
    value.splice(value.indexOf(parentIndex), 1);
    activeMap.value.set(showOptions[index], value);
    const childValue = childrenMap.value.get(showOptions[index]) ?? [];
    childValue.splice(childValue.indexOf(parentIndex), 1);
    childrenMap.value.set(showOptions[index], childValue);

    label = processPrefix(index);
    showValue = processPrefix(index, "value");

    // 向上通知我们取消选中了
    hiddenHandle(option, index, parentIndex, false);
  }
  showValues.splice(showValues.indexOf((showValue as any) + option.value), 1);
  showLabels.splice(showLabels.indexOf(label + option.value));
  label += option.label + props.join;
  showValue += option.value + props.join;

  const children = option.children as any;
  for (let i = 0; i < children.length; i++) {
    const o = children[i];
    if (Array.isArray(o.children) && o.children.length !== 0) {
      cancelHandle(o, index, parentIndex, label, showValue);
    } else {
      rootSearchSub(option, i, label, showValue as string);
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
      goHeavy(showValues, showValue);
      goHeavy(showLabels, showLabel);
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

function goHeavy<T>(target: T[], value: T) {
  if (!target.includes(value)) {
    target.push(value);
  }
}
</script>
<style scoped lang="less">
@color: (rgb(239, 239, 245));

.m-cascader {
  position: relative;
  .m-cascader-showValue {
    min-height: 38px;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid @color;
    padding: 5px 10px;
    border-radius: 10px;
    .m-cascader-tag {
      height: 100%;
      margin: 5px 10px;
    }
    &:hover {
      border-color: #0ff;
    }
  }
  input {
    position: absolute;
    left: -9999px;
  }
  input:focus + .m-cascader-list {
    opacity: 1;
  }
  .m-cascader-list {
    position: absolute;
    display: inline-flex;
    top: 110%;
    left: 0;
    opacity: 0;
    transition: all 1s;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    background-color: #fff;
    .m-cascader-list-option {
      border-right: 1px solid @color;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
