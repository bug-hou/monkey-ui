<template>
  <div class="m-dropdown-child">
    <div
      class="m-dropdown-child-content"
      @mouseenter="enterContentHandle"
      @mouseleave="leaveContentHandle"
      :class="
        defaultValue?.includes(options[valueName]) && 'm-dropwon-item-active'
      "
    >
      <m-icon name="m-star" class="m-dropdown-item-icon"></m-icon>
      <p>
        {{ options[labelName] }}
      </p>
    </div>
    <p class="m-dropdown-child-arrow"></p>
    <transition name="fade">
      <m-dropdown-item
        v-show="isMove || showChild || isShow"
        @mouseenter="enterHandle"
        @mouseleave="leaveHandle"
        class="m-dropdown-child-item"
        :options="options.children"
        @hidden="hiddenHandle"
        :default-value="defaultValue"
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
import { ref, defineProps, onMounted, watch } from "vue";
import mDropdownItem from "./dropdownItem.vue";
import mIcon from "../../icon/src/icon.vue";
const props = withDefaults(
  defineProps<{
    options: any;
    labelName?: string;
    valueName?: string;
    defaultValue?: any[];
    flag?: boolean;
    iconName?: string;
  }>(),
  {
    labelName: "label",
    valueName: "value",
    iconName: "icon"
  }
);
const emits = defineEmits(["hidden"]);

const showChild = ref(false);
const isMove = ref(false);
const isShow = ref(false);

function enterContentHandle() {
  showChild.value = true;
  isShow.value = true;
}
function leaveContentHandle() {
  setTimeout(() => {
    showChild.value = false;
    isShow.value = false;
  }, 100);
}
function enterHandle() {
  isMove.value = true;
  setTimeout(() => {
    showChild.value = true;
    isShow.value = true;
  }, 200);
}
function leaveHandle() {
  isMove.value = false;
  showChild.value = false;
}
function hiddenHandle(option) {
  isMove.value = false;
  showChild.value = false;
  isShow.value = false;
  emits("hidden", option);
}

watch(
  () => props.flag,
  (newValue) => {
    if (newValue) {
      isShow.value = false;
    }
  }
);
onMounted(() => {
  // inputRef.value?.focus();
});
</script>
<style scoped lang="less">
.fade-leave-from,
.fade-enter-to {
  transform: scale(1);
  opacity: 1;
}
.fade-leave-active,
.fade-enter-active {
  transform-origin: 0 0;
  transition: all 0.3s;
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
  transform: scale(0.5);
}
.m-dropdown-child {
  display: flex;
  position: relative;
  .m-dropdown-child-content {
    height: 100%;
    width: 100%;
    padding-left: 0;
    white-space: nowrap;
    display: flex;
    border-radius: 5px;
    &.m-dropwon-item-active {
      color: #18a058;
    }
    .m-dropdown-item-icon {
      position: absolute;
      font-size: 16px;
      left: 4px;
      top: 50%;
      transform: translateY(-50%);
    }
    p {
      padding: 5px 18px;
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
    pointer-events: none;
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
