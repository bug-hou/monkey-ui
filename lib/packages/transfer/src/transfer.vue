<template>
  <div class="m-transfer">
    <div class="m-transfer-origin m-transfer-common">
      <header>
        <div
          class="m-transfer-content"
          :class="originInfo.disableds === 0 && 'm-transfer-content-disabled'"
          @click="changeStatusHandle('origin')"
        >
          <span :class="originInfo.selectStatus" class="m-transfer-rect"></span>
          <span>{{ originLabel }}</span>
        </div>
        <div>
          <span>{{ originInfo.selection.length }}</span>
          <span>/</span>
          <span>{{ originInfo.options.length }}</span>
        </div>
      </header>
      <main ref="originRef">
        <ul>
          <transition-group name="mTransferItemLeave" mode="out-in">
            <li
              v-for="(item, index) in originInfo.options"
              :key="item[props.valueName]"
              :class="item.disabled && 'm-transfer-li-disabled'"
              @click="clickHandle('origin', index, item)"
            >
              <span
                class="m-transfer-rect"
                :class="originInfo.selection.includes(index) && 'select'"
              ></span>
              <p>{{ processObject(labelName, item) }}</p>
            </li>
          </transition-group>
        </ul>
      </main>
      <footer></footer>
    </div>
    <div class="m-transfer-operate">
      <m-button-vue
        color="#fff"
        textColor="rgb(64, 67, 69)"
        borderColor="rgb(224, 224, 230)"
        :disabled="originInfo.selection.length === 0"
        @mClick="buttonHandle('origin')"
      >
        <m-icon name="m-toRight"></m-icon>
      </m-button-vue>
      <m-button-vue
        color="#fff"
        textColor="rgb(64, 67, 69)"
        borderColor="rgb(224, 224, 230)"
        :disabled="targetInfo.selection.length === 0"
        @mClick="buttonHandle('target')"
      >
        <m-icon name="m-toLeft"></m-icon>
      </m-button-vue>
    </div>
    <div class="m-transfer-target m-transfer-common">
      <header>
        <div
          class="m-transfer-content"
          :class="targetInfo.disableds === 0 && 'm-transfer-content-disabled'"
          @click="changeStatusHandle('target')"
        >
          <span :class="targetInfo.selectStatus" class="m-transfer-rect"></span>
          <span>{{ targetLabel }}</span>
        </div>
        <div>
          <span>{{ targetInfo.selection.length }}</span>
          <span>/</span>
          <span>{{ targetInfo.options.length }}</span>
        </div>
      </header>
      <main ref="targetRef">
        <ul>
          <transition-group name="mTransferItemLeaveRight" mode="out-in">
            <li
              v-for="(item, index) in targetInfo.options"
              :class="item.disabled && 'm-transfer-li-disabled'"
              :key="item[props.valueName]"
              @click="clickHandle('target', index, item)"
            >
              <span
                class="m-transfer-rect"
                :class="targetInfo.selection.includes(index) && 'select'"
              ></span>
              <p>{{ processObject(labelName, item) }}</p>
            </li>
          </transition-group>
        </ul>
      </main>
      <footer></footer>
    </div>
  </div>
</template>

<script lang="ts" setup name="m-transfer">
/*
 * @Author: bughou
 * @Date: 2022-06-15 21:16:24
 * @Description: 创建一个m-transfer组件
 */
// 从下载的组件中导入函数
import { ref, onMounted, defineProps, reactive } from "vue";
import mButtonVue from "../../button/src/button.vue";
import { useScroll } from "../../../hooks";
import { Info } from "./transfer";

const props = withDefaults(
  defineProps<{
    originLabel?: string;
    targetLabel?: string;
    originOptions: any[];
    targetOptions: any[];
    labelName?: string;
    valueName?: string;
    targetValue?: any[];
    originValue?: any[];
  }>(),
  {
    originLabel: "原项",
    targetLabel: "目标项",
    labelName: "label",
    valueName: "value"
  }
);

const emits = defineEmits(["update:targetValue", "update:originValue"]);

const originRef = ref<HTMLElement>();
const targetRef = ref<HTMLElement>();

const originInfo = reactive<Info>({
  selectStatus: "none",
  selection: [],
  options: props.originOptions,
  scroll: undefined,
  disableds: processDisableds(props.originOptions)
});

const originValues = ref<any[]>([]);
const targetValues = ref<any[]>([]);

const targetInfo = reactive<Info>({
  selectStatus: "none",
  selection: [],
  options: props.targetOptions,
  scroll: undefined,
  disableds: processDisableds(props.targetOptions)
});

function clickHandle(type: "origin" | "target", index: number, item: any) {
  if (typeof item === "object" && item.disabled) {
    return;
  }
  let target: number[];
  let curInfo: Info;
  let values: any[];
  if (type === "origin") {
    target = originInfo.selection;
    curInfo = originInfo;
    values = originValues.value;
  } else {
    target = targetInfo.selection;
    curInfo = targetInfo;
    values = targetValues.value;
  }
  const value = processObject(props.valueName, item);
  if (target.includes(index)) {
    target.splice(target.indexOf(index), 1);
    values.splice(values.indexOf(value), 1);
    if (curInfo.selection.length === 0) {
      curInfo.selectStatus = "none";
    } else {
      curInfo.selectStatus = "has";
    }
  } else {
    target.push(index);
    values.push(value);
    if (curInfo.selection.length === curInfo.disableds) {
      curInfo.selectStatus = "select";
    } else {
      curInfo.selectStatus = "has";
    }
  }
  if (type === "origin") {
    emits("update:originValue", values);
  } else {
    emits("update:targetValue", values);
  }
}

function buttonHandle(type: "origin" | "target") {
  let target: any[];
  let curInfo: Info;
  let changeInfo: Info;
  if (type === "origin") {
    target = originInfo.selection;
    curInfo = originInfo;
    changeInfo = targetInfo;
  } else {
    target = targetInfo.selection;
    changeInfo = originInfo;
    curInfo = targetInfo;
  }
  target.sort((a, b) => b - a);
  for (let i = 0; i < target.length; i++) {
    const option = curInfo.options[target[i]];
    curInfo.options.splice(target[i], 1);
    changeInfo.options.unshift(option);
  }
  setTimeout(() => {
    targetInfo.scroll.refresh();
    originInfo.scroll.refresh();
  }, 500);
  curInfo.selection = [];
  curInfo.selectStatus = "none";

  originInfo.disableds = processDisableds(originInfo.options);
  targetInfo.disableds = processDisableds(targetInfo.options);
}

function changeStatusHandle(type: "target" | "origin") {
  let info: Info;
  let values: string[];
  if (type === "origin") {
    info = originInfo;
    values = originValues.value = [];
  } else {
    info = targetInfo;
    values = targetValues.value = [];
  }
  if (info.disableds === 0) {
    return;
  }
  info.selection = [];
  if (info.selectStatus !== "select") {
    for (let i = 0; i < info.options.length; i++) {
      if (info.options[i].disabled) {
        continue;
      }
      info.selection.push(i);
      values.push(info.options[i][props.valueName]);
    }
    info.selectStatus = "select";
  } else {
    info.selectStatus = "none";
  }
  if (type === "origin") {
    emits("update:originValue", values);
  } else {
    emits("update:targetValue", values);
  }
}

function processObject(key: string, obj: any) {
  if (typeof obj === "object") {
    return obj[key] ?? obj;
  } else {
    return obj;
  }
}

function processDisableds(objs: any[]) {
  let answer = 0;
  for (let obj of objs) {
    if (typeof obj === "object") {
      if (!obj.disabled) {
        answer++;
      }
    }
  }
  return answer;
}

function processInitialValue(
  target: any[],
  options: any[],
  type: "target" | "origin"
) {
  let index: number;
  options.forEach((item) => {
    if (
      target.some((i, ind) => {
        if (i.value === item.value) {
          index = ind;
          return true;
        }
      })
    ) {
      clickHandle(type, index, target[index]);
    }
  });
}

onMounted(() => {
  originInfo.scroll = useScroll(originRef.value as any, {
    bounce: false
  });
  targetInfo.scroll = useScroll(targetRef.value as any, { bounce: false });
});
</script>
<style scoped lang="less">
@keyframes leftToBottom {
  0% {
    height: 0px;
    width: 0px;
  }
  30% {
    height: 3px;
    width: 0;
  }
  100% {
    width: 8px;
    height: 3px;
  }
}
@keyframes toBottom {
  0% {
    width: 0px;
  }
  100% {
    width: 8px;
  }
}
.mTransferItemLeave-enter-from,
.mTransferItemLeave-leave-to {
  transform: translateX(100%);
}
.mTransferItemLeave-enter-active,
.mTransferItemLeave-leave-active {
  transition: all 0.4s;
}
.mTransferItemLeave-enter-to,
.mTransferItemLeave-leave-from {
  transform: translateX(0);
}
.mTransferItemLeaveRight-enter-from,
.mTransferItemLeaveRight-leave-to {
  transform: translateX(-100%);
}
.mTransferItemLeaveRight-enter-active,
.mTransferItemLeaveRight-leave-active {
  transition: all 0.4s;
}
.mTransferItemLeaveRight-enter-to,
.mTransferItemLeaveRight-leave-from {
  transform: translateX(0);
}
.m-transfer {
  display: flex;
  gap: 10px;
  height: 240px;
  .m-transfer-common {
    width: 200px;
    border: 1px solid rgb(224, 224, 230);
    border-radius: 10px;
    overflow: hidden;
    header {
      background-color: rgb(250, 250, 252);
      height: 36px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 10px;
      align-items: center;
      color: rgb(50, 48, 52);
      .m-transfer-content {
        font-size: 16px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &.m-transfer-content-disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      }
    }
    main {
      width: 100%;
      overflow: hidden;
      height: calc(100% - 36px);
      position: relative;
      color: #666;
      li {
        width: 100%;
        font-size: 16px;
        display: flex;
        height: 34px;
        align-items: center;
        padding-left: 5px;
        &.m-transfer-li-disabled {
          color: rgb(194, 194, 194);
          cursor: not-allowed;
          opacity: 0.5;
        }
      }
    }
    .m-transfer-rect {
      display: inline-block;
      width: 14px;
      height: 14px;
      border-radius: 3px;
      border: 1px solid rgb(224, 224, 230);
      margin-right: 5px;
      position: relative;
      &.select,
      &.has {
        background-color: #18a058;
      }
      &.select::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%) rotate(-45deg);
        border-left: 2px solid white;
        border-bottom: 2px solid white;
        animation: leftToBottom 0.5s forwards;
      }
      &.has::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-bottom: 2px solid white;
        animation: toBottom 0.5s forwards;
      }
    }
  }
  .m-transfer-operate {
    width: 50px;
    font-size: 28px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    height: 100%;
    justify-content: center;
  }
}
</style>
