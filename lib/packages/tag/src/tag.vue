<!-- bgTag -->
<template>
  <div
    :class="['mTag', effect, 'm-tag-' + size, active && 'active']"
    :style="[
      { ['--m-tag-color']: color },
      { ['--m-tag-background']: background }
    ]"
    @click="bgClick"
    v-if="cancle"
  >
    <slot></slot>
    <span
      v-if="isCancle"
      class="iconfont icon-cha"
      @click.stop="changecancle"
    ></span>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { ref, withDefaults, defineProps } from "vue";
import { LightTheme } from "../../../common/style/index";

import { getLightColor } from "../../../utils";

const props = withDefaults(
  defineProps<{
    effect?: "light" | "dark";
    color?: string;
    type?: "success" | "error" | "info" | "primary" | "warning";
    size?: "mini" | "small" | "medium";
    border?: boolean;
    background?: boolean;
    isCancle?: boolean;
    isDelete?: boolean;
  }>(),
  {
    effect: "light",
    type: "success",
    size: "small",
    border: true,
    isCancle: true,
    isDelete: true,
    background: undefined
  }
);
const emits = defineEmits(["deleteClick", "bgClick"]);
const colors = LightTheme;
const cancle = ref(true);
const active = ref(false);

const color = props.color ?? colors[props.type];
const background = props.background ?? getLightColor(props.color);
const changecancle = () => {
  if (props.isDelete) {
    cancle.value = false;
    emits("deleteClick");
  }
};
const bgClick = (event) => {
  active.value = !active.value;
  emits("bgClick", active.value, event);
};
</script>
<style scoped lang="less">
.mTag {
  border-radius: 5px;
  display: inline-block;
  padding: 1px 8px;
  font-size: 12px;
  height: 24px;
  cursor: pointer;
  background: var(--m-tag-color);
  color: var(--m-tag-color);
  border-color: var(--border);
  .iconfont {
    font-size: 12px;
    margin-left: 5px;
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    transition: all 0.5s;
    border-radius: 50%;
    &:hover {
      background: var(--color);
      color: white;
      cursor: pointer;
    }
  }
}
.mini {
  font-size: 12px;
  padding: 1px 4px;
  height: 22px;
}
.medium {
  padding: 2px 10px;
  font-size: 14px;
  height: 30px;
}
.light {
  border: 1px solid var(--color);
  color: var(--color);
}
.dark {
  background: var(--color);
  color: white;
}
.acitve {
}
</style>
