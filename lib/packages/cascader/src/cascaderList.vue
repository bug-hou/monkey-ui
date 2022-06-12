<template>
  <div class="m-cascader-option-list" ref="cascaderRef">
    <div>
      <template v-for="(item, index) in options">
        <cascader-item-vue
          class="m-cascader-option-list-item"
          :class="[
            activeIndex === index && 'm-cascader-option-list-item-active'
          ]"
          :option="item"
          :status="
            selectIndex?.includes(index)
              ? 'select'
              : hasIndex.includes(index)
              ? 'has'
              : 'none'
          "
          @click="clickHandle(item, index)"
          @cancel="cancelHandle(item, index)"
          @select="selectHandle(item, index)"
        ></cascader-item-vue>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup name="m-cascader-list">
/*
 * @Author: bughou
 * @Date: 2022-06-09 13:24:41
 * @Description: 创建一个m-cascader-list组件
 */
// 从下载的组件中导入函数
import { ref, defineProps, onMounted, defineEmits } from "vue";
import cascaderItemVue from "./cascaderItem.vue";
import { useScroll } from "../../../hooks";
import { Options } from "../config/type";

const props = withDefaults(
  defineProps<{
    options: Options[];
    index: number;
    activeIndex?: number;
    selectIndex?: number[];
    hasIndex?: number[];
  }>(),
  {}
);

const emits = defineEmits(["change", "show", "hidden", "select", "cancel"]);
const cascaderRef = ref<HTMLElement>();

function clickHandle(item: Options, parentIndex: number) {
  if (item.disabled) {
    return;
  }
  if (item.children && item.children.length !== 0) {
    emits("change", item.children, props.index, parentIndex);
  } else {
    if (!props.selectIndex?.includes(parentIndex)) {
      emits("show", item, props.index, parentIndex);
    } else {
      emits("hidden", item, props.index, parentIndex);
    }
  }
}
function cancelHandle(item: Options, parentIndex: number) {
  emits("cancel", item, props.index, parentIndex);
}
function selectHandle(item: Options, parentIndex: number) {
  emits("select", item, props.index, parentIndex);
}
onMounted(() => {
  useScroll(cascaderRef.value, {
    bounce: false
  });
});
</script>
<style scoped lang="less">
.m-cascader-option-list {
  padding: 10px 0;
  max-height: 250px;
  width: 180px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  .m-cascader-option-list-item:last-child {
    margin: 0;
  }
  .m-cascader-option-list-item-active {
    background-color: rgb(239, 239, 245);
  }
  .m-cascader-option-list-select-item {
    color: #990;
  }
}
</style>
