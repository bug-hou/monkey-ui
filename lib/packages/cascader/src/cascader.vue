<template>
  <label class="m-cascader">
    <input type="text" ref="inputRef" />
    <div
      class="m-cascader-label"
      @mousedown.prevent="a"
      :class="'m-cascader-label-' + size"
    >
      <div class="m-cascader-showValue" v-if="showLabels.length !== 0">
        <m-tag
          class="m-cascader-tag"
          :size="size"
          v-for="(item, index) in showLabels"
          :closabled="clearable"
          @close="closeHandle(index)"
          >{{ processLabel(item, labelRule) }}</m-tag
        >
      </div>
      <p v-else style="color: #666">
        {{ placeholder }}
      </p>
    </div>
    <div
      class="m-cascader-contain"
      :class="'m-cascader-contain-' + direction"
      @mousedown="a"
    >
      <div class="m-cascader-list" v-if="options">
        <cascader-list-vue
          v-for="(option, index) in showOptions"
          class="m-cascader-list-option"
          :index="index"
          :options="option"
          :select-index="activeMap.get(option) ?? []"
          :active-index="!isNaN(index) ? activeIndex[index] : undefined"
          :has-index="childrenMap.get(option) ?? []"
          @change="changeHandle"
          @show="showHandle"
          @hidden="hiddenHandle"
          @select="selectHandle"
          @cancel="cancelHandle"
          :trigger="remote ? 'click' : trigger"
        ></cascader-list-vue>
      </div>
      <div v-else></div>
      <div class="m-cascader-footer">
        <slot> </slot>
      </div>
    </div>
  </label>
</template>

<script lang="ts" setup name="m-cascader">
/*
 * @Author: bughou
 * @Date: 2022-06-09 13:02:25
 * @Description: 创建一个m-cascader组件
 */
// 从下载的组件中导入函数
import {
  reactive,
  defineProps,
  ref,
  watch,
  onMounted,
  toRaw,
  provide
} from "vue";
import { Options, TagType, Rule } from "../config/type";

import configName from "../config";

import mTag from "../../tag/src/tag.vue";

import cascaderListVue from "./cascaderList.vue";

const props = withDefaults(
  defineProps<{
    options: Options[];
    separator?: string;
    multiple?: boolean;
    modelValue?: string | string[];
    focus?: boolean;
    clearable?: boolean;
    maxTagCount?: number;
    tagType?: TagType;
    filter?: (str: string) => string;
    filterOption?: (Options: Options[]) => Options[];
    placeholder?: string;
    remote?: boolean;
    labelRule?: Rule;
    loadOption?: Options[];
    trigger?: "click" | "hover";
    size?: "mini" | "small" | "medium";
    direction?: "bottom" | "top";
    // 后添加的
    valueField?: string;
    labelField?: string;
  }>(),
  {
    separator: "/",
    multiple: false,
    focus: false,
    maxTagCount: 1,
    clearable: true,
    remote: false,
    labelRule: "all",
    filter: (str) => str,
    filterOption: (options) => options,
    trigger: "click",
    size: "small"
  }
);

const emits = defineEmits(["update:modelValue", "load"]);

const showOptions = reactive([props.options]);
const activeIndex = reactive<number[]>([]);
const showValues = reactive<string[]>(
  props.remote
    ? []
    : Array.isArray(props.modelValue)
    ? props.multiple
      ? props.modelValue
      : props.modelValue.slice(0, props.maxTagCount)
    : props.modelValue
    ? [props.modelValue]
    : []
);

const showLabels = reactive<string[]>([]);

const activeMap = ref(new WeakMap<object, number[]>());
const childrenMap = ref(new WeakMap<object, number[]>());
const inputRef = ref<HTMLInputElement>();

const loading = ref(false);

provide(configName.LOADING, loading);

watch(showValues, (newValue) => {
  emits("update:modelValue", toRaw(newValue));
});

function a() {
  inputRef.value?.focus();
}

onMounted(() => {
  if (props.focus) {
    a();
  }
});

if (!props.remote) {
  parseModelValue();
}

function parseModelValue() {
  const models: string[] = showValues;
  for (let i = 0; i < models.length; i++) {
    if (props.multiple) {
      queryLocation(models[i]);
    } else {
      if (i === props.maxTagCount) {
        break;
      }
      queryLocation(models[i]);
    }
  }
}

function queryLocation(value: string, type: "add" | "sub" = "add") {
  const valuess = value.split(props.separator);
  let options = props.options;
  let indexs: number[] = [];
  let optionss: Options[][] = [];
  let label = "";
  for (let i = 0; i < valuess.length; i++) {
    for (let j = 0; j < options.length; j++) {
      if (options[j].value === valuess[i]) {
        label += options[j].label + props.separator;
        if (i !== valuess.length - 1) {
          optionss.push(options);
          indexs.push(j);
        }
        if (type === "add") {
          treatmentToAdd(i, j, valuess, label, options);
        } else {
          treatmentToSub(i, j, valuess, options);
        }
        options = options[j].children ?? [];
        break;
      }
    }
  }
  while (indexs.length !== 0) {
    const key = optionss.pop() as any;
    const index = indexs.pop() as any;
    if (type === "add") {
      const value = activeMap.value.get(key as any) ?? [];
      if (value.length === key.length) {
        goHeavy(value, index);
        activeMap.value.set(key, value);
      } else {
        break;
      }
    } else {
      const childrenValue = childrenMap.value.get(key as any) ?? [];
      const cchildrenValue = childrenMap.value.get(key[index].children) ?? [];
      const vvalue = activeMap.value.get(key[index].children) ?? [];
      if (cchildrenValue.length === 0 && vvalue.length === 0) {
        removeValue(childrenValue, index);
        childrenMap.value.set(key, childrenValue);
      }
      if (childrenValue.length !== 0) {
        break;
      }
    }
  }
}

function treatmentToAdd(
  i: number,
  j: number,
  valuess: string[],
  label: string,
  options: Options[]
) {
  if (i === valuess.length - 1) {
    const activeValues = activeMap.value.get(options) ?? [];
    goHeavy(activeValues, j);
    activeMap.value.set(options, activeValues);
    goHeavy(showLabels, label.slice(0, -1));
    return;
  }
  const childrenValue = childrenMap.value.get(options) ?? [];
  goHeavy(childrenValue, j);
  childrenMap.value.set(options, childrenValue);
}

function treatmentToSub(
  i: number,
  j: number,
  valuess: string[],
  options: Options[]
) {
  if (i === valuess.length - 1) {
    const activeValues = activeMap.value.get(options) ?? [];
    removeValue(activeValues, j);
    activeMap.value.set(options, activeValues);
    return;
  }
  activeMap.value.delete(options);
}

function closeHandle(index: number) {
  queryLocation(showValues[index], "sub");
  removeValue(showValues, showValues[index]);
  removeValue(showLabels, showLabels[index]);
}

// 向showOPtions数组中添加值，并且同步更新activeIndex
async function changeHandle(
  option: Options,
  index: number,
  parentIndex: number
) {
  showOptions.splice(index + 1, showOptions.length);
  activeIndex.splice(index, activeIndex.length);
  if (props.remote) {
    const result = (await processRemote(option, index, parentIndex)) as any;
    processOptions(result, parentIndex);
  } else {
    processOptions(option.children ?? [], parentIndex);
  }
}

function processOptions(options: Options[], index: number) {
  showOptions.push(props.filterOption(options));
  activeIndex.push(index);
}

function processRemote(option: Options, index: number, parentIndex: number) {
  return new Promise((resolve, reject) => {
    try {
      if (option.children?.length !== 0) {
        resolve(option.children);
      } else {
        emits("load", option);
        loading.value = true;
        let cancelWatch = watch(
          () => props.loadOption,
          (newOptions) => {
            if (loading.value) {
              option.children = newOptions;
              loading.value = false;
              cancelWatch();
              resolve(newOptions);
            }
          }
        );
      }
    } catch (error) {
      reject(error);
    }
  });
}

function showHandle(
  option: Options,
  index: number,
  parentIndex: number,
  children = true
) {
  if (children) {
    processShow(index, option);
  }

  let key = showOptions[index];
  let values = activeMap.value.get(key) ?? [];
  goHeavy(values, parentIndex);
  if (!props.multiple) {
    processQueue();
  }
  // else {
  // activeMap.value = new WeakMap<object, number[]>();
  // childrenMap.value = new WeakMap<object, number[]>();
  // values[0] = parentIndex;
  // }
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
    // if (props.multiple) {
    //   values.splice(
    //     values.indexOf(
    //       curIndex === index ? parentIndex : activeIndex[curIndex - 1]
    //     ),
    //     1
    //   );
    //   activeMap.value.set(key, values);
    //   if (
    //     values.length === (curIndex === index ? key.length - 1 : key.length)
    //   ) {
    //     key = showOptions[curIndex - 1];
    //     values = activeMap.value.get(key) ?? [];
    //     curIndex--;
    //   } else {
    //     break;
    //   }
    // } else {
    //   activeMap.value.delete(key);
    //   if (
    //     values.length === (curIndex === index ? key.length - 1 : key.length)
    //   ) {
    //     key = showOptions[curIndex - 1];
    //     values = activeMap.value.get(key) ?? [];
    //     curIndex--;
    //   } else {
    //     break;
    //   }
    // }
    values.splice(
      values.indexOf(
        curIndex === index ? parentIndex : activeIndex[curIndex - 1]
      ),
      1
    );
    activeMap.value.set(key, values);
    if (values.length === (curIndex === index ? key.length - 1 : key.length)) {
      key = showOptions[curIndex - 1];
      values = activeMap.value.get(key) ?? [];
      curIndex--;
    } else {
      break;
    }
  }

  key = showOptions[index];

  values = childrenMap.value.get(key) ?? [];
  let childrenValue = activeMap.value.get(key) ?? [];
  while (index !== 0 && values.length === 0 && childrenValue.length === 0) {
    key = showOptions[index - 1];
    values = childrenMap.value.get(key) ?? [];
    values.splice(values.indexOf(childrenMap[index - 1]), 1);
    childrenValue = activeMap.value.get(key) ?? [];
    childrenMap.value.set(key, values);
    if (!props.multiple) {
      processQueue();
    }
    // if (props.multiple) {
    //   childrenValue = activeMap.value.get(key) ?? [];
    //   childrenMap.value.set(key, values);
    // } else {
    //   childrenMap.value.delete(key);
    // }
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
  // goHeavy(showValues, vvalue);
  // goHeavy(showLabels, name);
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
  // if (!props.multiple) {
  //   processQueue();
  // }

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
  if (!props.multiple || props.remote) {
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
  label += option.label + props.separator;
  showValue += option.value + props.separator;

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
  if (!props.multiple || props.remote) {
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
  label += option.label + props.separator;
  showValue += option.value + props.separator;

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
    showValue += showOptions[i][activeIndex[i]][key] + props.separator;
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
    goHeavy(showValues, showValue);
    goHeavy(showLabels, showLabel);
    if (!props.multiple) {
      processQueue();
    }
    // if (props.multiple) {
    //   goHeavy(showValues, showValue);
    //   goHeavy(showLabels, showLabel);
    // } else {
    //   showValues[0] = showValue;
    //   showLabels[0] = showLabel;
    // }
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

function removeValue<T>(target: T[], value: T) {
  if (target.includes(value)) {
    target.splice(target.indexOf(value), 1);
  }
}

function processQueue() {
  const len = showValues.length;
  if (len > props.maxTagCount) {
    const value = showValues.shift() as any;
    showLabels.shift();
    queryLocation(value, "sub");
  }
}

function processLabel(str: string, type: Rule) {
  const strs = str.split(props.separator).map((item) => props.filter(item));
  switch (type) {
    case "all":
      return strs.join(props.separator);
    case "child":
      return strs[strs.length - 1];
    case "parent":
      return strs.slice(-2).join(props.separator);
  }
}
</script>
<style scoped lang="less">
@color: (rgb(239, 239, 245));
@shadowColor: (rgb(48, 170, 105));
.m-cascader {
  position: relative;
  display: block;
  .m-cascader-label {
    min-height: 38px;
    border: 0.0625rem solid @color;
    padding: 5px 8px;
    border-radius: 10px;
  }
  .m-cascader-label-mini {
    min-height: 34px;
  }
  .m-cascader-label-medium {
    min-height: 42px;
  }
  .m-cascader-showValue {
    grid-gap: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    .m-cascader-tag {
      height: 100%;
    }
  }
  input {
    position: absolute;
    left: -9999px;
  }
  input:focus + div {
    border-color: rgb(48, 170, 105);
    box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.2);
  }
  input:focus ~ .m-cascader-contain {
    opacity: 1;
    z-index: 100;
    height: 250px;
  }
  .m-cascader-list {
    display: inline-flex;
    overflow: hidden;
    .m-cascader-list-option {
      border-right: 0.0625rem solid @color;
      &:last-child {
        border-right: none;
      }
    }
  }
  .m-cascader-contain {
    z-index: -100;
    position: absolute;
    top: 110%;
    overflow: hidden;
    height: 0;
    left: 0;
    opacity: 0;
    transition: all 1s;
    border-radius: 0.625rem;
    box-shadow: 0 0.1875rem 0.375rem -0.25rem rgba(0, 0, 0, 0.12),
      0 0.375rem 1rem 0 rgba(0, 0, 0, 0.08),
      0 0.5625rem 1.75rem 0.5rem rgba(0, 0, 0, 0.05);
    background-color: #fff;
    &.m-cascader-contain-top {
      top: auto;
      bottom: 110%;
    }
  }
  .m-cascader-footer {
    background-color: @color;
    width: 100%;
    color: black;
  }
}
</style>
