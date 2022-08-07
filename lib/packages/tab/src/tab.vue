<template>
  <div class="m-tab">
    <div class="m-tab-head-scroll" ref="tabHeadRef">
      <ul class="m-tab-head" :class="'m-tab-head-' + type">
        <template v-for="(item, index) in tabNames" :key="index">
          <li
            :class="[
              activeTabName === item.name && 'm-tab-head-li-active',
              item.disabled && 'm-tab-head-li-disabled'
            ]"
            @click="clickHandle(item)"
          >
            {{ item.name }}
            <m-icon
              v-if="type === 'card' && (closable ? closable : item.closable)"
              class="m-tab-head-icon"
              @click.stop="deleteItemHandle(index)"
              name="m-cha"
            />
          </li>
        </template>
      </ul>
    </div>
    <div class="m-tab-body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup name="m-tab">
/*
 * @Author: bughou
 * @Date: 2022-08-05 19:14:14
 * @Description: 创建一个m-tab组件
 */
// 从下载的组件中导入函数
import { useScroll } from "../../../hooks";
import { ref, defineProps, provide, onMounted, nextTick } from "vue";
import mIcon from "../../icon/src/icon.vue";
import { BScrollInstance } from "better-scroll";

interface IOption {
  [x: string]: any;
  name: string;
}
const props = withDefaults(
  defineProps<{
    type?: "line" | "card" | "none" | "segment";
    animated?: boolean;
    barWidth?: number;
    defaultValue?: string;
    size?: "mini" | "small" | "medium";
    justifyContent?: "center" | "left" | "right";
    closable?: boolean;
    addTabName?: (...args: any) => any;
  }>(),
  {
    addTabName: () => {},
    type: "line"
  }
);
const tabNames = ref<IOption[]>([]);
const activeTabName = ref("");

let bsScroll: BScrollInstance;

const tabHeadRef = ref<HTMLElement>();

provide("addTabName", addTabName);
provide("delTabName", delTabName);
provide("activeTabName", activeTabName);

function addTabName(tabName: string, options?: any) {
  props.addTabName(tabName);
  tabNames.value.push({
    name: tabName,
    ...options
  });
}

function delTabName(tabName: string) {
  tabNames.value.splice(tabName.indexOf(tabName), 1);
}

function clickHandle<T extends IOption>(option: T) {
  if (option.disabled) return;
  activeTabName.value = option.name;
}

function deleteItemHandle(index: number) {
  tabNames.value.splice(index, 1);
  nextTick(() => {
    bsScroll.refresh();
  });
}
onMounted(() => {
  activeTabName.value = props.defaultValue ?? tabNames.value[0].name;
  if (tabHeadRef.value) {
    bsScroll = useScroll(tabHeadRef.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      bounce: false
    });
  }
});
</script>
<style scoped lang="less">
@color: (rgb(48, 170, 105));
@borderColor: (rgb(239, 239, 245));
@bgColor: #f7f7fa;
@borderWidth: 2px;
.m-tab {
  width: 100%;
  .m-tab-head-scroll {
    overflow: hidden;
    width: 100%;
  }
  .m-tab-head {
    display: flex;
    justify-content: start;
    align-items: center;
    box-sizing: border-box;
    height: 36px;
    gap: 5px;
    white-space: nowrap;
    width: fit-content;
    &.m-tab-head-none {
      border-bottom: none;
      li::after {
        background-color: @color;
      }
    }
    &.m-tab-head-line {
      border-bottom: @borderWidth solid @borderColor;
      li::after {
        background-color: @color;
      }
    }
    &.m-tab-head-card {
      border-bottom: 1px solid @borderColor;
      li {
        border: 1px solid @borderColor;
        border-bottom: none;
        background-color: @bgColor;
        border-radius: 6px 6px 0 0/6px 6px 0 0;
        &::after {
          border-bottom-color: @borderColor;
        }
      }
      .m-tab-head-li-active {
        background-color: white;
        &::after {
          background-color: white;
        }
      }
    }
    &.m-tab-head-segment {
      background-color: @bgColor;
      padding: 5px;
      border-radius: 2px;
      height: 46px;
      li {
        &::after {
          display: none;
        }
        &.m-tab-head-li-active {
          border-radius: 4px;
          background-color: white;
        }
      }
    }
    li {
      flex: 0 0;
      display: flex;
      cursor: pointer;
      padding: @borderWidth 30px 0;
      height: 100%;
      position: relative;
      align-items: center;
      gap: 15px;
      .m-tab-head-icon {
        font-size: 14px;
        margin-right: -10px;
        padding: 4px;
        border-radius: 3px;
        &:hover {
          background-color: rgba(0, 0, 0, 0.12);
        }
      }
      &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        width: 0;
        height: @borderWidth;
        transform: translateX(-50%);
        transition: width 0.3s;
      }
      &.m-tab-head-li-disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
      &:hover {
        color: @color;
      }
    }
    .m-tab-head-li-active {
      color: @color;
      &::after {
        width: 100%;
      }
    }
  }
  .m-tab-body {
    // overflow: hidden;
    width: 100%;
    position: relative;
  }
}
</style>
