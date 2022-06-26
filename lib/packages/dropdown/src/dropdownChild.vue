<template>
  <div class="m-dropdown-child">
    <div
      class="m-dropdown-child-content"
      @mouseenter="enterContentHandle"
      @mouseleave="leaveContentHandle"
    >
      <p>{{ options[labelName] }}</p>
    </div>
    <p class="m-dropdown-child-arrow"></p>
    <transition name="mDropdownOpacity">
      <m-dropdown-item
        v-show="isMove || showChild"
        @mouseenter="enterHandle"
        @mouseleave="leaveHandle"
        class="m-dropdown-child-item"
        :options="options.children"
        @hidden="hiddenHandle"
      ></m-dropdown-item>
    </transition>
  </div>
</template>

<script lang="ts" setup name="m-dropdown-child">
/*
 * @Author: bughou
 * @Date: 2022-06-20 21:07:22
 * @Description: 创建一个m-dropdown-child组件
 */
// 从下载的组件中导入函数
import { ref, defineProps, onMounted } from "vue";
import mDropdownItem from "./dropdownItem.vue";
const props = withDefaults(
  defineProps<{
    options: any;
    labelName?: string;
  }>(),
  {
    labelName: "label"
  }
);
const emits = defineEmits(["hidden"]);

const showChild = ref(false);
const isMove = ref(false);

function enterContentHandle() {
  showChild.value = true;
}
function leaveContentHandle() {
  setTimeout(() => {
    showChild.value = false;
  }, 10);
}
function enterHandle() {
  isMove.value = true;
  setTimeout(() => {
    showChild.value = true;
  }, 20);
}
function leaveHandle() {
  isMove.value = false;
}
function hiddenHandle(option) {
  isMove.value = false;
  showChild.value = false;
  emits("hidden", option);
}
onMounted(() => {
  // inputRef.value?.focus();
});
</script>
<style scoped lang="less">
.m-dropdown-child {
  display: flex;
  position: relative;
  .m-dropdown-child-content {
    height: 100%;
    padding-left: 0;
    white-space: nowrap;
    display: flex;
    border-radius: 5px;
    p {
      padding: 5px 13px;
    }
    &:hover {
      background-color: rgb(243, 243, 245);
    }
    &::before,
    &::after {
      content: "";
      display: inline-block;
      width: 2px;
    }
  }
  .m-dropdown-child-arrow {
    border: 2px solid transparent;
    border-top-color: #6666;
    border-right-color: #6666;
    width: 7px;
    height: 7px;
    margin-left: 7px;
    transform: rotate(45deg) translateY(-50%);
    position: absolute;
    top: 50%;
    right: 10px;
  }
  .m-dropdown-child-item {
    top: 0px;
    left: 100%;
  }
}
</style>
