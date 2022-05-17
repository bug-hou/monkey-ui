<!-- bgSelect -->
<template>
  <div :class="['m-select-contain', size]">
    <div
      :class="['m-select-box', isShowList && 'hover', disabled && 'disabled']"
    >
      <div @click.stop="showListClickHandle">
        <div v-if="multiple" class="m-select-box-multipart">
          <ul>
            <li v-for="(item, index) in selectItem" :key="item.value ?? item">
              {{ item.value ?? item }}
            </li>
          </ul>
        </div>
        <div v-else class="m-select-box-clone">
          {{ selectItem.length === 0 ? placeholder : selectItem[0] }}
        </div>
        <p>
          <m-icon
            v-if="delete"
            name="m-delete"
            @click="deleteClickHandle"
          ></m-icon>
          <m-icon v-else name="m-left"></m-icon>
        </p>
      </div>
    </div>
    <main class="m-select-scrollContain" ref="listRef">
      <ul :class="['m-select-list', position]">
        <li
          v-for="(item, index) in list"
          :key="item.value ?? item"
          :class="item.disabled && 'disabled'"
          @click="clickHandler"
        >
          <slot :item="item" :index="index">
            {{ item.label ?? item }}
          </slot>
        </li>
      </ul>
    </main>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { reactive, ref, withDefaults, defineProps, onMounted } from "vue";
import { computedPosition } from "../../../utils";
import { useScroll } from "../../../hooks";

const props = withDefaults(
  defineProps<{
    multiple?: boolean;
    list: any[];
    size?: "mini" | "small" | "medium";
    disabled?: boolean;
    placeholder?: string;
    autoPosition?: boolean;
    delete?: boolean;
  }>(),
  {
    size: "small"
  }
);

const emits = defineEmits(["select", "remove"]);

// 自定义方法引
// 自定义组件引入
// 是否显示list列表信息
const isShowList = ref(false);
let selectItem = reactive([]);
const position = ref<"bottom" | "top">("bottom");
const listRef = ref<HTMLElement>(null);
let bscoll = null;

function clickHandler(item) {
  const value = item.value ?? item;
  if (props.disabled) {
    if (props.multiple) {
      if (!selectItem.includes(value)) {
        selectItem.push(value);
      }
    } else {
      selectItem[0] = value;
    }
  }
}

const showListClickHandle = () => {
  isShowList.value = true;
  bscoll.refresh();
  addEventListener("click", windowHandle);
  function windowHandle() {
    isShowList.value = false;
    removeEventListener("click", windowHandle);
  }
};

const deleteClickHandle = () => {
  while (selectItem.length !== 0) {
    selectItem.pop();
  }
};

window.onresize = () => {
  position.value = computedPosition(listRef.value);
};

onMounted(() => {
  position.value = computedPosition(listRef.value);
  bscoll = useScroll(listRef.value);
});
</script>
<style scoped lang="less">
.m-select-contain {
  width: 100%;
  position: relative;
  .m-select-box {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    color: var(--font-color-select);
    cursor: pointer;
    border: 1px solid var(--border-color-select);
    position: relative;
    .show {
      display: flex;
      flex-wrap: wrap;
      grid-template-columns: auto-flow;
      li {
        color: var(--font-color-select-multiple);
        font-size: 16px;
        padding: 5px 8px;
        margin: 10px 5px;
        border-radius: 4px;
        border: 1px solid var(--border-color-select-multiple);
        background: var(--back-color-select-multiple);
        position: relative;
        display: inline-block;
        margin-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &::before {
          position: absolute;
          top: 50%;
          right: 5%;
          transform: translateY(-50%);
          cursor: pointer;
          position: relative;
        }
      }
    }
    .m-select-box-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 10px;
      height: 10px;
      border: 1px solid transparent;
      border-bottom-color: #0ff;
      border-left-color: #0ff;
      transform: rotate(90deg);
    }
  }
  .m-select-scrollContain {
    opacity: 1;
    transition: opacity 0.5s;
    top: 100%;
    left: 0;
    width: 100%;
    right: 0;
    overflow: hidden;
    max-height: 500px;
    border-radius: 5px;
    border: 1px solid var(--border-color-select);
    position: absolute;
    .m-select-list {
      padding: 10px 0;
      width: 100%;
      li {
        padding-left: 1em;
        display: flex;
        align-items: center;
        width: 100%;
        height: 30px;
        font-size: 16px;
        &:hover {
          background: var(--back-color-select);
          color: var(--font-color-select-active);
        }
      }
    }
  }
}
.mini {
  min-height: 30px;
}
.small {
  min-height: 34px;
}
.medium {
  min-height: 40px;
}
</style>
