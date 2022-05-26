<!-- bgPagination -->
<template>
  <ul
    :class="[
      'm-pagination',
      'm-pagination-' + size,
      useBack && 'm-pagination-background',
      skip && 'm-pagination-skiping'
    ]"
    :style="[{ '--m-pagination-interval': interval }]"
  >
    <li class="m-pagination-prefix" v-if="prefix">
      <slot name="prefix">
        {{ prefix }}
      </slot>
    </li>
    <li
      @click="toLeft"
      v-if="nav"
      class="m-pagination-nav"
      :class="activeLis === 1 && 'm-pagination-disabled'"
    >
      <slot name="left">
        <m-icon name="m-after"></m-icon>
      </slot>
    </li>
    <li :class="activeLis === 1 && 'active'" @click="activeLis = 1">
      {{ label }}1
    </li>
    <li
      v-show="leftMore"
      v-if="+defaultPageSize < +count"
      @click="clickLeftMore"
      class="m-pagination-nav"
    >
      <m-icon name="m-ellipsis"></m-icon>
    </li>
    <template v-for="(item, index) in showLis" :key="index">
      <li :class="+activeLis === +item && 'active'" @click="activeLis = item">
        {{ label + item }}
      </li>
    </template>
    <li
      v-show="rightMore"
      v-if="+defaultPageSize < +count"
      @click="clickRightMore"
      class="m-pagination-nav"
    >
      <m-icon name="m-ellipsis"></m-icon>
    </li>
    <li :class="+activeLis === +count && 'active'" @click="activeLis = count">
      {{ label + count }}
    </li>
    <li
      @click="toRight"
      v-if="nav"
      class="m-pagination-nav"
      :class="activeLis === count && 'm-pagination-disabled'"
    >
      <slot name="right">
        <m-icon name="m-right"></m-icon>
      </slot>
    </li>
    <m-select
      class="m-pagination-select"
      v-if="showSizePicker"
      :options="pageSizes"
      v-model="pageSize"
      size="mini"
    ></m-select>
    <m-input-number
      class="m-pagination-skip"
      v-if="skip"
      :min="1"
      :max="count"
      v-model="activeLis"
      size="mini"
    ></m-input-number>
    <li class="m-pagination-suffix" v-if="suffix">
      <slot name="suffix">
        {{ suffix }}
      </slot>
    </li>
  </ul>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { reactive, ref, watch, withDefaults, defineProps } from "vue";

// 自定义方法引入
import mInputNumber from "../../inputNumber/src/inputNumber.vue";
import mSelect from "../../select/src/select.vue";

const props = withDefaults(
  defineProps<{
    count?: number;
    defaultPageSize?: number;
    nav?: boolean;
    size?: "mini" | "small" | "medium";
    useBack?: boolean;
    skip?: boolean;
    modelValue: number;
    prefix?: string | boolean;
    pageCount?: number;
    pageSizes?: any[];
    label?: string;
    showSizePicker?: boolean;
    pageSize?: number;
    suffix?: string | boolean;
    interval?: string;
  }>(),
  {
    size: "small",
    count: 10,
    defaultPageSize: 5,
    nav: true,
    useBack: false,
    skip: false,
    label: "",
    showSizePicker: false,
    interval: "5px"
  }
);

const emits = defineEmits(["update:modelValue", "update:pageSize"]);

const showLis = reactive(
  new Array(props.defaultPageSize - 2).fill(0).map((_, index) => index + 2)
);
const mid = Math.ceil(showLis.length / 2);
const lisInfo = reactive({
  left: mid - 1,
  right: showLis.length - mid
});
const activeLis = ref(props.modelValue ?? 1);
const leftMore = ref(false);
const rightMore = ref(true);

watch(
  activeLis,
  (newValue) => {
    emits("update:modelValue", newValue);
    const count = Number(props.count);
    const defaultPageSize =
      Number(props.defaultPageSize) > 2 ? Number(props.defaultPageSize) : 3;
    // 判断是否显示更多组件
    if (newValue - lisInfo.left > 2) {
      leftMore.value = true;
    } else {
      leftMore.value = false;
    }
    if (newValue + lisInfo.right < count - 1) {
      rightMore.value = true;
    } else {
      rightMore.value = false;
    }
    showLis.splice(0, showLis.length);
    if (leftMore.value && !rightMore.value) {
      const startCount = count - (defaultPageSize - 2);
      for (var i = startCount; i < count; i++) {
        showLis.push(i);
      }
    } else if (!leftMore.value && rightMore.value) {
      const startCount = 2;
      for (var i = 0; i < defaultPageSize - 2; i++) {
        showLis.push(startCount + i);
      }
    } else if (leftMore.value && rightMore.value) {
      const startCount = Math.floor(defaultPageSize / 2) - 1;
      for (let i = newValue - startCount; i <= newValue + startCount; i++) {
        showLis.push(i);
      }
    } else {
      for (let i = 2; i < count; i++) {
        showLis.push(i);
      }
    }
  },
  {
    immediate: true
  }
);

watch(
  () => props.pageSize,
  (newSize) => {
    emits("update:pageSize", newSize);
  }
);
const toLeft = () => {
  if (activeLis.value > 1) {
    activeLis.value--;
  }
};
const toRight = () => {
  if (activeLis.value < props.count) {
    activeLis.value++;
  }
};
const clickLeftMore = () => {
  activeLis.value = showLis.shift();
};
const clickRightMore = () => {
  activeLis.value = showLis.pop();
};

// const changePage = (event) => {
//   if (+event.target.value > +props.count) {
//     activeLis.value = +props.count;
//     event.target.value = +props.count;
//   } else {
//     activeLis.value = +event.target.value;
//   }
// };
</script>
<style scoped lang="less">
.m-pagination {
  display: flex;
  align-items: center;
  ul {
    align-items: center;
    display: flex;
  }
  li {
    height: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    margin: 0 var(--m-pagination-interval);
    cursor: pointer;
    border-radius: 8px;
    &:hover {
      color: var(--font-color-pagination-active);
    }
    &.m-pagination-nav {
      border: 1px solid #ccc;
    }
    &.m-pagination-disabled {
      cursor: not-allowed;
      background-color: #0000001a;
      color: var(--font-color-pagination-back);
    }
  }
  .m-pagination-select {
    display: inline;
    flex: 0 0;
    white-space: nowrap;
    margin: 0 var(--m-pagination-interval);
  }
  .m-pagination-skip {
    margin: 0 var(--m-pagination-interval);
  }
  .active {
    color: var(--font-color-pagination-active);
    border: 1px solid var(--font-color-pagination-active);
  }
}
.m-pagination-background {
  li {
    background: var(--back-color-pagination);
    border-radius: 3px;
    color: var(--font-color-pagination-back);
    &.active {
      border: none;
    }
  }
}

.m-pagination-mini {
  font-size: 12px;
  height: 25px;
}
.m-pagination-small {
  font-size: 14px;
  height: 30px;
}
.m-pagination-medium {
  font-size: 16px;
  height: 35px;
}
</style>
