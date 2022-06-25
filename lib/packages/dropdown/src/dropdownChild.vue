<template>
  <label class="m-dropdown-child">
    <input type="text" ref="inputRef" />
    <p>{{ options[labelName] }}</p>
    <p class="m-dropdown-child-arrow"></p>
    <m-dropdown-item
      class="m-dropdown-child-item"
      :options="options.children"
      @focus="focusHandle"
      @mousedown="clickHandle"
    ></m-dropdown-item>
  </label>
</template>

<script lang="ts" setup name="m-dropdown-child">
/*
 * @Author: bughou
 * @Date: 2022-06-20 21:07:22
 * @Description: 创建一个m-dropdown-child组件
 */
// 从下载的组件中导入函数
import { ref, defineProps, onMounted, nextTick } from "vue";
import mDropdownItem from "./dropdownItem.vue";
const emits = defineEmits(["focus"]);
const props = withDefaults(
  defineProps<{
    options: any;
    labelName?: string;
  }>(),
  {
    labelName: "label"
  }
);

const inputRef = ref<HTMLElement>();

function clickHandle() {
  // console.log(inputRef.value);
  // emits("focus");
  inputRef.value?.focus();
  console.log("first");
}

function focusHandle() {
  console.log("first");
  console.log(inputRef.value);
  inputRef.value?.focus();
}

function moveHandle() {}
onMounted(() => {
  // inputRef.value?.focus();
});
</script>
<style scoped lang="less">
.m-dropdown-child {
  display: flex;
  position: relative;
  input {
    position: absolute;
    z-index: -9999px;
    left: -9999px;
  }
  .m-dropdown-child-arrow {
    border: 2px solid transparent;
    border-top-color: #6666;
    border-right-color: #6666;
    width: 7px;
    height: 7px;
    margin-left: 7px;
    transform: rotate(45deg) translateY(-50%);
    position: relative;
    top: 12px;
  }
  .m-dropdown-child-item {
    top: -7px;
    left: 100%;
    display: none;
  }
  input:focus ~ .m-dropdown-child-item {
    display: block;
  }
}
</style>
