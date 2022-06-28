<template>
  <ul
    class="m-dropdown-item"
    @mouseenter="enterHandle"
    @mouseleave="leaveHandle"
  >
    <li v-for="(item, index) in options" class="m-dropdown-item-li">
      <m-dropdown-child
        v-if="item.children"
        :options="item"
        :flag="flag"
        @hidden="clickHandle"
        :default-value="defaultValue"
      ></m-dropdown-child>
      <div v-else @click.stop="clickHandle(item)">
        <m-icon
          v-if="item[iconName]"
          :name="item[iconName]"
          class="m-dropdown-item-icon"
        ></m-icon>
        <p
          :class="
            defaultValue?.includes(item[valueName]) && 'm-dropwon-item-active'
          "
        >
          {{ item[labelName] }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup name="m-dropdown-item">
/*
 * @Author: bughou
 * @Date: 2022-06-20 21:05:18
 * @Description: 创建一个m-dropdown-item组件
 */
// 从下载的组件中导入函数
import { defineProps, ref } from "vue";
import mDropdownChild from "./dropdownChild.vue";
import mIcon from "../../icon/src/icon.vue";
const props = withDefaults(
  defineProps<{
    options: any[];
    labelName?: string;
    valueName?: string;
    defaultValue?: any[];
    iconName?: string;
  }>(),
  {
    labelName: "label",
    valueName: "value",
    iconName: "icon"
  }
);
const emits = defineEmits(["hidden"]);

let flag = ref(false);
function clickHandle(option: any) {
  emits("hidden", option);
}
function enterHandle() {
  flag.value = true;
}
function leaveHandle() {
  flag.value = false;
}
</script>
<style scoped lang="less">
@distance: 20px;
.m-dropdown-item {
  position: absolute;
  border-radius: 8px;
  background-color: white;
  padding: 2px 0;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  &.m-dropdown-right {
    left: 100%;
  }
  &.m-dropdown-left {
    right: 100%;
  }
  &.m-dropdown-top {
    bottom: 100%;
  }
  .m-dropdown-item-li {
    cursor: pointer;
    div {
      width: 100%;
      height: 100%;
      padding-left: 0;
      white-space: nowrap;
      display: flex;
      color: #666;
      position: relative;
      .m-dropdown-item-icon {
        position: absolute;
        z-index: 9999;
        font-size: 16px;
        left: 4px;
        top: 50%;
        transform: translateY(-50%);
      }
      p {
        &.m-dropwon-item-active {
          color: #18a058;
          background-color: #18a05866;
        }
        flex: 1;
        height: 100%;
        padding: 5px @distance;
        border-radius: 5px;
        &:hover {
          background-color: rgb(243, 243, 245);
        }
      }
      &::before,
      &::after {
        content: "";
        display: inline-block;
        width: 2px;
      }
    }
  }
}
</style>
