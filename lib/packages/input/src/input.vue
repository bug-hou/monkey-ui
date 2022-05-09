<!-- mInput -->
<template>
  <div class="labelBox">
    <label
      :class="[
        'mInput',
        'input-' + size,
        focus && 'focus',
        round && 'round',
        disabled && 'disabled'
      ]"
      :style="{
        ['--radius']: radius,
        ['--pre-color']: prefixColor,
        ['--pre-text-color']: prefixTextColor,
        ['--suf-color']: suffixColor,
        ['--suf-text-color']: suffixTextColor
      }"
    >
      <div v-if="prefix">
        <slot name="prefix">
          <p class="slot">{{ prefix }}</p>
        </slot>
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
        :maxlength="maxLength"
        ref="input"
        :disabled="disabled"
      />
      <slot name="icon">
        <p v-if="(clear || password) && value" @click="clickIcon" class="clear">
          <m-icon v-if="password" name="m-show"></m-icon>
          <m-icon v-else name="m-delete"></m-icon>
        </p>
      </slot>
      <p v-if="maxLength" class="max-length">{{ len }}/{{ maxLength }}</p>
      <p v-if="loading" class="loading">
        <loop-loading-vue color="#409eff"></loop-loading-vue>
      </p>
      <div v-if="suffix" class="suffix">
        <slot name="suffix">
          <p class="slot">{{ suffix }}</p>
        </slot>
      </div>
    </label>
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
          <slot name="list" :value="item">{{
            typeof item === "object" ? item.value : item
          }}</slot>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script lang="ts" setup :inheritAttrs="false">
// 从下载的组件中导入函数
import { defineEmits, ref, watch, withDefaults, defineProps } from "vue";
import { LoopLoadingVue } from "../../../common/loading/index";

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
    suffix?: boolean | string;
    type?: InputType;
    modelValue?: InputBase;
    clear?: boolean;
    password?: boolean;
    list?: any[];
    prefix?: boolean | string;
    index?: number | string;
    radius?: number | string;
    round?: boolean;
    prefixColor?: string;
    prefixTextColor?: string;
    suffixColor?: string;
    suffixTextColor?: string;
    disabled?: boolean;
    maxLength?: number;
    loading?: boolean;
  }>(),
  {
    size: "small",
    type: "text",
    clear: false,
    list: () => [],
    radius: "10px",
    round: false,
    prefixColor: "#f1f2f3",
    prefixTextColor: "#606366",
    suffixColor: "#f1f2f3",
    suffixTextColor: "#606366",
    disabled: false
  }
);
const value = ref<InputBase>(
  typeof props.modelValue === "string"
    ? props.modelValue
    : JSON.stringify(props.modelValue)
);
const inputType = ref(props.type);
const isShow = ref(false);
const isHover = ref(false);
const input = ref<InstanceType<typeof HTMLInputElement>>();
const activeIndex = ref(undefined);
const focus = ref(false);
const len = ref(String(value.value).length);

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue;
    len.value = String(value.value).length;
  }
);

// 发送input中变量(v-model)
var changeValue = (event: any) => {
  value.value = event.target.value;
  len.value = String(value.value).length;
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
  value.value = item.value ?? item;
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
  isShow.value = true;
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
.labelBox {
  color: var(--font-color-input);
  position: relative;
}
.mInput {
  overflow: hidden;
  height: 30px;
  display: flex;
  border-radius: var(--radius);
  position: relative;
  border: 1px solid var(--border-color-input);
  .max-length {
    font-size: 14px;
    letter-spacing: 1px;
    padding: 0 2px;
  }
  .loading {
    display: flex;
    align-items: center;
    padding-right: 5px;
  }
  &.focus {
    border: 1px solid var(--border-color-input-active);
  }
  &.round {
    border-radius: 50px;
    div {
      border-radius: 50px 0 0 50px;
    }
    .suffix {
      border-radius: 0 50px 50px 0;
    }
  }
  &.disabled {
    cursor: not-allowed;
    background-color: rgb(250, 250, 252);
    border: 1px solid rgb(224, 224, 230);
    div {
      cursor: not-allowed;
    }
    input {
      cursor: not-allowed;
    }
  }
  .clear {
    right: 20px;
    top: 50%;
    transform: translateX(-10px);
    // transform: translateY(-50%);
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
    box-sizing: border-box;
    border-radius: var(--radius) 0 0 var(--radius);
    cursor: pointer;
    .slot {
      padding: 0 5px;
    }
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
    background: var(--suf-color);
    color: var(--suf-text-color);
  }
}
.list {
  font-size: 14px;
  line-height: 32px;
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
.input-mini {
  min-width: 220px;
  height: 28px;
  line-height: 30px;
  font-size: 14px;
}
.input-small {
  min-width: 280px;
  height: 32px;
  font-size: 14px;
  line-height: 32px;
}
.input-medium {
  min-width: 380px;
  height: 38px;
  font-size: 16px;
  line-height: 35px;
}
</style>
