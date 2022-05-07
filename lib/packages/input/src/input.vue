<!-- mInput -->
<template>
  <label
    :class="['mInput', size, focus && 'focus', round && 'round']"
    :style="{
      ['--radius']: radius,
      ['--pre-color']: prefixColor,
      ['--pre-text-color']: prefixTextColor
    }"
  >
    <div v-if="prefix" class="slot">
      <slot name="prefix"> </slot>
    </div>
    <input
      v-bind="$attrs"
      :tabindex="index"
      @input="changeValue"
      :type="inputType"
      v-model="value"
      @keyup.enter="changeListShow"
      @keyup.up="upHandler"
      @keyup.down="downHandler"
      @blur="blurHandler"
      @focus="focusHandler"
      ref="input"
    />
    <slot name="icon">
      <p
        v-if="(clear || password) && value"
        @click="clickIcon"
        :class="[
          'iconfont',
          clear ? 'icon-shanchu' : 'icon-xianshimima',
          'bgicon'
        ]"
      >
        <m-icon name="m-delete"></m-icon>
      </p>
    </slot>
    <div v-if="suffix" class="slot suffix">
      <slot name="suffix"> </slot>
    </div>
    <ul
      v-if="
        list && Array.isArray(list) && list.length !== 0 && (isShow || isHover)
      "
      class="list"
      @mouseenter="enterHandler"
      @mouseleave="leaveHandler"
    >
      <transition-group name="listPositionOpacity" :appear="true" mode="out-in">
        <li
          v-for="(item, index) in list"
          :key="item"
          @click="clickListItem(item, index)"
          :class="activeIndex == index && 'hover'"
          @mouseenter="itemEnterHandler(index)"
        >
          {{ typeof item === "object" ? item.value : item }}
        </li>
      </transition-group>
    </ul>
  </label>
</template>

<script lang="ts" setup :inheritAttrs="false">
// 从下载的组件中导入函数
import { defineEmits, ref, watch, withDefaults, defineProps } from "vue";

import type {
  Size as InputSize,
  Type as InputType,
  Base as InputBase
} from "./input";

// 自定义方法引入

// 自定义组件引入
const emits = defineEmits(["update:modelValue", "liClick", "focus", "blur"]);

const props = withDefaults(
  defineProps<{
    size?: InputSize;
    suffix?: boolean;
    type?: InputType;
    modelValue?: InputBase;
    clear?: boolean;
    password?: boolean;
    list?: any[];
    prefix?: boolean;
    index?: number | string;
    radius?: number | string;
    round?: boolean;
    prefixColor?: string;
    prefixTextColor?: string;
  }>(),
  {
    size: "small",
    type: "text",
    clear: false,
    list: () => [],
    radius: "10px",
    round: false,
    prefixColor: "#f1f2f3",
    prefixTextColor: "#606366"
  }
);
const value = ref<InputBase>(
  typeof props.modelValue === "string"
    ? props.modelValue
    : JSON.stringify(props.modelValue)
);
const inputType = ref(props.type);
const isShow = ref(true);
const isHover = ref(true);
const input = ref(null);
const activeIndex = ref(undefined);
const focus = ref(false);

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue;
  }
);

// 发送input中变量(v-model)
var changeValue = (event: any) => {
  value.value = event.target.value;
  isShow.value = true;
  emits("update:modelValue", event.target?.value);
};

// 监听是否点击图标
const clickIcon = () => {
  if (props.clear) {
    value.value = "";
    emits("update:modelValue", "");
  } else {
    inputType.value = inputType.value === "password" ? "text" : "password";
  }
};

// 点击list中的item
const clickListItem = (item, index: number) => {
  value.value = item;
  isShow.value = false;
  isHover.value = false;
  emits("update:modelValue", item);
  emits("liClick", item, index);
};

const changeListShow = () => {
  if (props.list) {
    value.value =
      typeof props.list[activeIndex.value] == "object"
        ? props.list[activeIndex.value].value
        : props.list[activeIndex.value];
    isShow.value = false;
  }
};

const blurHandler = (e) => {
  isShow.value = false;
  focus.value = false;
  emits("blur", e);
};

const focusHandler = (e) => {
  focus.value = true;
  emits("focus", e);
};

const enterHandler = () => {
  isHover.value = true;
};

const leaveHandler = () => {
  activeIndex.value = undefined;
  isHover.value = false;
};
const itemEnterHandler = (index) => {
  activeIndex.value = index;
};
const downHandler = () => {
  if (activeIndex.value < props.list.length - 1) {
    activeIndex.value++;
  }
  if (activeIndex.value === undefined) {
    activeIndex.value = 0;
  }
};
const upHandler = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
  }
  if (activeIndex.value === undefined) {
    activeIndex.value = 0;
  }
};
</script>
<style scoped lang="less">
.mInput {
  // overflow: hidden;
  height: 30px;
  display: flex;
  border-radius: var(--radius);
  position: relative;
  color: var(--font-color-input);
  border: 1px solid var(--border-color-input);
  &.focus {
    border: 1px solid var(--border-color-input-active);
  }
  &.round {
    border-radius: 50px;
  }
  > p {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: inherit;
    color: inherit;
  }
  > * {
    height: 100%;
  }
  div {
    background: var(--pre-color);
    color: var(--pre-text-color);
    white-space: nowrap;
    padding: 0 5px;
    box-sizing: border-box;
    border-radius: var(--radius) 0 0 var(--radius);
    cursor: pointer;
  }
  div + input {
    border-radius: 0 5px 5px 0;
  }
  input {
    border: none;
    padding-left: 10px;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: inherit;
    border-radius: 5px;
  }
  .suffix {
    border-radius: 0 var(--radius) var(--radius) 0;
  }
  .list {
    padding: 5px;
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    right: 0;
    height: auto;
    background: var(--back-color-input-list);
    z-index: 100;
    border: 1px solid var(--border-color-input-list);
    border-radius: 5px;
    li {
      transition: all 0.3s;
      font-size: inherit;
      width: 100%;
      padding-left: 5px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      &.hover {
        padding-left: 10px;
        cursor: pointer;
        background: var(--back-color-input-list-active);
        color: var(--font-color-input-list-active);
        font-weight: bold;
      }
    }
  }
}
.mini {
  width: 220px;
  height: 28px;
  line-height: 30px;
  font-size: 14px;
}
.small {
  width: 280px;
  height: 32px;
  font-size: 14px;
  line-height: 32px;
}
.medium {
  width: 380px;
  height: 38px;
  font-size: 16px;
  line-height: 35px;
}
</style>
