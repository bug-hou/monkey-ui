<!-- bgSelect -->
<template>
  <div :class="['m-select-contain', size]">
    <div
      :class="['m-select-box', isShowList && 'hover', disabled && 'disabled']"
      @click.stop="showList"
    >
      <!-- <i class="m-select-box-icon"></i> -->
      <ol class="m-select-box-show" v-if="multiple">
        <li
          class="iconfont icon-shanchu"
          @click="removeItem(index)"
          v-for="(item, index) in itemList"
        >
          {{ item }}
        </li>
      </ol>
      <div v-else>
        <p>{{ currentValue === "" ? placeholder : currentValue }}</p>
        <!-- <p
          :class="[
            'iconfont',
            currentValue ? 'icon-shanchu' : 'icon-shang',
            isShowList && 'rotate'
          ]"
          @click.self.stop="removeValue"
        ></p> -->
      </div>
    </div>
    <main class="m-select-scrollContain" ref="listRef">
      <ul :class="['m-select-list', position]" v-show="true">
        <li
          @click.self.stop="closeList(item)"
          v-for="(item, index) in list"
          :key="index"
          :class="item.disabled && 'disabled'"
        >
          <slot :item="item" :index="index">
            {{ typeof item === "object" ? item.label : item }}
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
const currentValue = ref("");
let itemList = reactive([]);
const position = ref("bottom");
const listRef = ref<HTMLElement>(null);
const closeList = (item: any) => {
  if (!item.disabled) {
    if (!props.multiple) {
      isShowList.value = !isShowList.value;
      currentValue.value = item;
    } else {
      if (itemList.includes(item)) {
        return;
      }
      itemList.push(item.value ?? item);
    }
    emits("select", item);
  }
};
const showList = (event) => {
  if (!props.disabled) {
    if (props.autoPosition) {
      position.value = computedPosition(event);
    }
    isShowList.value = !isShowList.value;
    window.addEventListener("click", hiddenList);
  }
};
const hiddenList = () => {
  isShowList.value = false;
  window.removeEventListener("click", hiddenList);
};
const removeValue = () => {
  emits("remove", currentValue.value);
  isShowList.value = true;
  currentValue.value = "";
};
const removeItem = (index) => {
  const item = itemList.splice(index, 1);
  emits("remove", item[0]);
};

onMounted(() => {
  const bscoll = useScroll(listRef.value);
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
    &.hover {
      border: 1px solid var(--border-color-select-active);
      div {
        p {
          &:first-child {
            color: var(--font-color-select-active);
          }
        }
      }
    }
    .show {
      height: 100%;
      width: 100%;
      overflow-x: auto;
      white-space: nowrap;
      li {
        color: var(--font-color-select-multiple);
        font-size: 14px;
        height: 80%;
        padding: 2px 20px 2px 5px;
        transform: translateY(10%);
        border-radius: 4px;
        border: 1px solid var(--border-color-select-multiple);
        background: var(--back-color-select-multiple);
        position: relative;
        display: inline-block;
        margin-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:last-child {
          margin-right: 0;
        }
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
