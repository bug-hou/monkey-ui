<!-- bgSelect -->
<template>
  <div :class="['m-select-contain']">
    <div
      :class="[
        'm-select-box',
        disabled && 'm-select-disabled',
        'm-select-' + size,
        selectItem.length === 0 && 'm-select-placeholder'
      ]"
      @click.stop="showListClickHandle"
    >
      <div v-if="multiple" class="m-select-box-multipart">
        <ul class="m-select-multiple-show" v-if="selectItem.length !== 0">
          <li v-for="(item, index) in selectItem" :key="item.value ?? item">
            <span>{{ item.value ?? item }}</span>
            <span
              class="m-select-list-delete"
              @click.stop="deleteClickHandle(index)"
            >
              <m-icon name="m-cha"></m-icon>
            </span>
          </li>
        </ul>
        <span v-else>
          {{ placeholder }}
        </span>
      </div>
      <div v-else class="m-select-box-clone">
        {{ selectItem.length === 0 ? placeholder : selectItem[0] }}
      </div>
      <p :class="['m-select-icon', isShowList && 'hover']">
        <m-icon
          v-if="delete"
          name="m-delete"
          @click="deleteClickHandle(null)"
        ></m-icon>
        <m-icon
          v-else
          name="m-right"
          @click.stop="changeShowStatusHandle"
        ></m-icon>
      </p>
    </div>
    <main
      :class="[
        'm-select-scrollContain',
        isShowList && 'm-select-show-list',
        'm-select-show-' + position
      ]"
      ref="listRef"
    >
      <ul class="m-select-list">
        <li
          v-for="(item, index) in options"
          :key="item.value ?? item"
          data-name="m-select-item"
          :class="[
            item.disabled && 'm-select-item-disabled',
            selectItem.includes(item.label ?? item) && 'm-select-list-active'
          ]"
          @click="clickHandler(item)"
        >
          <slot :item="item" :index="index">
            {{ item.label ?? item }}
          </slot>
        </li>
        <m-divider v-if="more"></m-divider>
        <li
          :class="[
            'm-select-list-more',
            !loading && 'm-select-list-more-after'
          ]"
          v-if="more"
          @click.stop="showLoadingHandle"
        >
          <slot name="more" v-if="!loading"> 显示更多 </slot>
          <long-vue v-else color="#0005"></long-vue>
        </li>
      </ul>
    </main>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import {
  reactive,
  ref,
  withDefaults,
  defineProps,
  onMounted,
  watch,
  nextTick
} from "vue";
import { computedPosition } from "../../../utils";
import { useScroll } from "../../../hooks";
import mDivider from "../../divider/src/divider.vue";
import longVue from "../../../common/loading/long.vue";

const props = withDefaults(
  defineProps<{
    modelValue: any;
    multiple?: boolean;
    options: any[];
    size?: "mini" | "small" | "medium";
    disabled?: boolean;
    placeholder?: string;
    autoPosition?: boolean;
    delete?: boolean;
    more?: boolean;
  }>(),
  {
    size: "small",
    multiple: false,
    delete: false,
    more: false
  }
);

const emits = defineEmits(["update:modelValue", "loading"]);

// 自定义方法引
// 自定义组件引入
// 是否显示list列表信息
const isShowList = ref(false);
let selectItem = reactive([]);
const position = ref<"bottom" | "top">("bottom");
const listRef = ref<HTMLElement>(null);
let bscroll = null;
const loading = ref(false);

function clickHandler(item) {
  const value = item.label ?? item;
  if (!props.disabled) {
    if (!item.disabled) {
      if (props.multiple) {
        if (!selectItem.includes(value)) {
          selectItem.push(value);
        } else {
          selectItem.splice(selectItem.indexOf(value), 1);
        }
      } else {
        selectItem[0] = value;
        isShowList.value = false;
      }
    }
  }
  emits("update:modelValue", selectItem);
}

watch(
  () => props.options,
  () => {
    nextTick(() => {
      bscroll.refresh();
      loading.value = false;
    });
  },
  {
    deep: true
  }
);

function changeShowStatusHandle() {
  if (props.disabled) {
    return;
  }
  isShowList.value = !isShowList.value;
}

const showListClickHandle = (event) => {
  if (!props.disabled && !isShowList.value) {
    // if (event.target.nodeName === "DIV") {
    position.value = computedPosition(listRef.value);
    isShowList.value = true;
    // }
    setTimeout(() => {
      bscroll.refresh();
    }, 500);
    addEventListener("click", windowHandle);
    function windowHandle(event) {
      if (!event.target.dataset.name) {
        isShowList.value = false;
        removeEventListener("click", windowHandle);
      }
    }
  }
};

const deleteClickHandle = (index?: number) => {
  if (index != undefined) {
    selectItem.splice(index, 1);
    return;
  }
  while (selectItem.length !== 0) {
    selectItem.pop();
  }
};

function showLoadingHandle() {
  loading.value = true;
  emits("loading");
}

window.onresize = () => {
  position.value = computedPosition(listRef.value);
};

onMounted(() => {
  position.value = computedPosition(listRef.value);
  bscroll = useScroll(listRef.value);
});
</script>
<style scoped lang="less">
.m-select-contain {
  width: 100%;
  position: relative;
  .m-select-box {
    box-sizing: border-box;
    padding-right: 20px;
    width: 100%;
    padding-left: 0.5em;
    display: flex;
    align-items: center;
    border-radius: 10px;
    color: var(--font-color-select);
    cursor: pointer;
    border: 1px solid var(--border-color-select);
    position: relative;
    transition: all 0.3s;
    &:hover {
      box-shadow: 0 0 5px var(--border-color-select-active);
      border-color: var(--border-color-select-active);
    }
    &.m-select-disabled {
      box-shadow: none;
      border-color: var(--border-color-select);
      cursor: not-allowed;
      background-color: #0001;
    }
    &.m-select-placeholder {
      color: gray;
    }
    .m-select-multiple-show {
      display: flex;
      flex-wrap: wrap;
      grid-template-columns: auto-flow;
      li {
        cursor: pointer;
        color: var(--font-color-select-multiple);
        font-size: 16px;
        padding: 1px 6px;
        margin: 5px 10px 5px 5px;
        border-radius: 4px;
        border: 1px solid var(--border-color-select-multiple);
        background: var(--back-color-select-multiple);
        position: relative;
        margin-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        align-items: center;
        .m-select-list-delete {
          cursor: pointer;
          margin-left: 10px;
          border-radius: 50%;
          display: inline-block;
          font-size: 10px;
          text-align: center;
          transition: all 0.5s;
          &:hover {
            transform: rotate(90deg);
          }
        }
      }
    }
    .m-select-box-clone {
      width: 100%;
      display: flex;
      align-items: center;
    }
    .m-select-icon {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      transition: all 0.5s;
      &.hover {
        transform: translateY(-50%) rotate(90deg);
      }
    }
  }
  .m-select-scrollContain {
    margin-top: 10px;
    transition: all 0.5s;
    background-color: white;
    z-index: 100;
    top: 100%;
    left: 0;
    width: 100%;
    right: 0;
    overflow: hidden;
    max-height: 0;
    border-radius: 5px;
    position: absolute;
    &.m-select-show-top {
      bottom: 100%;
      top: auto;
      margin-bottom: 10px;
    }
    // box-shadow: 0px 0 10px 5px #0003;
    &.m-select-show-list {
      max-height: 300px;
      border: 1px solid var(--border-color-select);
    }
    .m-select-list {
      padding: 10px 0;
      width: 100%;
      .m-select-list-more {
        justify-content: center;
        cursor: pointer;
        &:hover {
          background: inherit;
          color: var(--font-color-select-active);
          &.m-select-list-more-after::after {
            border-top-color: var(--font-color-select-active);
          }
        }
        &.m-select-list-more-after::after {
          transition: all 0.3s;
          margin-left: 10px;
          content: "";
          display: inline-block;
          border: 8px solid transparent;
          border-top-color: #0009;
          transform: translateY(25%);
        }
      }
      .m-select-list-active {
        background: var(--back-color-select);
        color: var(--font-color-select-active);
        padding-left: 15px;
      }
      li {
        transition: all 0.5s;
        padding-left: 10px;
        display: flex;
        align-items: center;
        width: 100%;
        height: 30px;
        font-size: 16px;
        &:hover {
          background: var(--back-color-select);
          color: var(--font-color-select-active);
        }
        &.m-select-item-disabled {
          cursor: not-allowed;
          background-color: #0001;
          color: #bbb;
        }
      }
    }
  }
}
.m-select-mini {
  min-height: 30px;
}
.m-select-small {
  min-height: 35px;
}
.m-select-medium {
  min-height: 45px;
}
</style>
