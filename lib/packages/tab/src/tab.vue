<template>
  <div class="m-tab">
    <div
      class="m-tab-head-scroll"
      ref="tabHeadRef"
      :class="[
        scrollTabShadow.left && 'm-tab-scroll-left',
        scrollTabShadow.right && 'm-tab-scroll-right'
      ]"
    >
      <ul
        class="m-tab-head"
        :class="['m-tab-head-' + type]"
        :style="{ justifyContent }"
      >
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
import { ref, defineProps, provide, onMounted, nextTick, reactive } from "vue";
import mIcon from "../../icon/src/icon.vue";
import { BScrollInstance } from "better-scroll";

interface IOption {
  [x: string]: any;
  name: string;
}
const props = withDefaults(
  defineProps<{
    type?: "line" | "card" | "bar" | "segment";
    animated?: boolean;
    barWidth?: number;
    defaultValue?: string;
    size?: "mini" | "small" | "medium";
    justifyContent?:
      | "center"
      | "space-around"
      | "start"
      | " space-between"
      | "space-evenly";
    closable?: boolean;
    addTabName?: (...args: any) => any;
  }>(),
  {
    addTabName: () => {},
    type: "line",
    justifyContent: "space-evenly"
  }
);
const tabNames = ref<IOption[]>([]);
const activeTabName = ref("");

let bsScroll: BScrollInstance;

const tabHeadRef = ref<HTMLElement>();

const scrollTabShadow = reactive({
  left: false,
  right: false
});

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
    const totalLength = parseFloat(
      getComputedStyle(tabHeadRef.value.children[0]).width
    );
    let startX: number = 0;
    const index = tabNames.value.findIndex(
      (item) => item.name === props.defaultValue
    );
    if (index !== -1) {
      startX = (totalLength / tabNames.value.length) * index * -1;
    }
    bsScroll = useScroll(tabHeadRef.value, {
      startX,
      click: true,
      scrollX: true,
      scrollY: false,
      bounce: false,
      scrollbar: false as any,
      eventPassthrough: "vertical"
    });
    const scrollX = bsScroll.maxScrollX;
    if (scrollX) {
      bsScroll.on("scroll", ({ x }) => {
        scrollTabShadow.right = true;
        scrollTabShadow.left = true;
        if (x === 0) {
          scrollTabShadow.left = false;
        } else if (x <= scrollX) {
          scrollTabShadow.right = false;
        }
      });
    }
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
    position: relative;
    &::after,
    &::before {
      transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 20px;
      z-index: 1;
    }
    &.m-tab-scroll-right::after {
      box-shadow: inset -20px -3px 8px -8px rgb(0 0 0 / 20%);
      right: 0;
    }
    &.m-tab-scroll-left::before {
      left: 0;
      box-shadow: inset 20px 0 8px -8px rgb(0 0 0 / 20%);
    }
  }
  .m-tab-head {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 40px;
    gap: 5px;
    white-space: nowrap;
    width: fit-content;
    min-width: 100%;
    &.m-tab-head-bar {
      border-bottom: none;
      padding-bottom: 2px;
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
        &:hover {
          color: initial;
        }
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
    padding: 10px 0;
  }
}
</style>
