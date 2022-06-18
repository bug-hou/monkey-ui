<!-- <template>
  <div class="m-transfer-vertual">
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
      <nav v-if="filterable">
        <m-input-vue
          class="m-transfer-input"
          placeholder="请输入"
          v-model="originInfo.inputValue"
          clear
        ></m-input-vue>
      </nav>
      <main ref="originRef">
        <div>
          <m-vertual-scroll
            :options="originInfo.options"
            :height="34"
            style="width: 100%"
            @option="optionHandle"
          >
            <template #default="{ value }">
              <li :class="value.disable && 'm-transfer-li-disabled'">
                <span
                  class="m-transfer-rect"
                  :class="originInfo.selection.includes(index) && 'select'"
                ></span>
                <p>{{ processObject(value) }}</p>
              </li>
            </template>
          </m-vertual-scroll>
        </div>
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
  </div>
</template>

<script lang="ts" setup name="m-transfer-vertual">
/*
 * @Author: bughou
 * @Date: 2022-06-18 14:33:29
 * @Description: 创建一个m-transfer-vertual组件
 */
// 从下载的组件中导入函数
import { ref, onMounted, defineProps, reactive, watch } from "vue";
import mButtonVue from "../../button/src/button.vue";
import mInputVue from "../../input/src/input.vue";
import mNullVue from "../../../common/svg/null.vue";
import mVertualScroll from "../../vertual-scroll/src/vertualScroll.vue";
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
    filterable?: boolean;
    height?: number;
    width?: number;
    filter?: (m: any[], key: string, value: string) => any[];
  }>(),
  {
    originLabel: "源项",
    targetLabel: "目标项",
    labelName: "label",
    valueName: "value",
    filterable: false,
    targetValue: () => [],
    originValue: () => [],
    width: 180,
    height: 220,
    filter: (m: any[], key: string, value: string): any[] => {
      return m.filter((item) => {
        if (typeof item[key] === "string") {
          return item[key].includes(value);
        }
      });
    }
  }
);

const emits = defineEmits(["update:targetOptions", "update:originOptions"]);

const originRef = ref<HTMLElement>();
const targetRef = ref<HTMLElement>();

const showAnimation = ref(false);

const originInfo = reactive<Info>({
  selectStatus: "none",
  selection: [],
  options: props.originOptions,
  scroll: undefined,
  disableds: processDisableds(props.originOptions),
  inputValue: "",
  height: 0
});

const originValues = ref<any[]>([]);
const targetValues = ref<any[]>([]);

const targetInfo = reactive<Info>({
  selectStatus: "none",
  selection: [],
  options: props.targetOptions,
  scroll: undefined,
  disableds: processDisableds(props.targetOptions),
  inputValue: ""
});

processInitialValue(props.originOptions, props.originValue, "origin");
processInitialValue(props.targetOptions, props.targetValue, "target");

function buttonHandle(type: "origin" | "target") {
  showAnimation.value = true;

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
  const len = target.length;
  for (let i = 0; i < len; i++) {
    const option = curInfo.options[target[i]];
    curInfo.options.splice(target[i], 1);
    changeInfo.options.unshift(option);
  }
  setTimeout(() => {
    showAnimation.value = false;
    targetInfo.scroll.refresh();
    originInfo.scroll.refresh();
  }, 500);
  curInfo.selection = [];
  curInfo.selectStatus = "none";

  for (let i = 0; i < changeInfo.selection.length; i++) {
    changeInfo.selection[i] += len;
  }

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
    emits("update:originOptions", values);
  } else {
    emits("update:targetOptions", values);
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
        if (i.value === item) {
          index = ind;
          return true;
        }
      })
    ) {
      clickHandle(type, index, target[index]);
    }
  });
}

function processFilter(options: any[], key: string, value: string) {
  return props.filter(options, key, value);
}

function optionHandle(item) {
  let index: number = 0;
  originInfo.options.forEach((option, ind) => {
    if (option[props.valueName] === item[props.valueName]) {
      index = ind;
    }
  });
  if (originInfo.selection.includes(index)) {
    originInfo.selection.splice(index, 1);
  } else {
    originInfo.selection.push(index);
  }
}

function processHeight(type: "target" | "origin") {
  const info: Info = type === "origin" ? originInfo : targetInfo;
  info.height =
}

onMounted(() => {
  originInfo.scroll = useScroll(originRef.value as any, {
    bounce: false
  });
  targetInfo.scroll = useScroll(targetRef.value as any, { bounce: false });
});

watch(
  () => originInfo.inputValue,
  () => {
    setTimeout(() => {
      originInfo.scroll.refresh();
    }, 100);
  }
);

watch(
  () => targetInfo.inputValue,
  () => {
    setTimeout(() => {
      targetInfo.scroll.refresh();
    }, 100);
  }
);
</script>
<style scoped lang="less">
@bgColor: (rgb(224, 224, 230));
@borderColor: (rgb(250, 250, 252));
@color: (rgb(50, 48, 52));
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
.m-transfer-vertual {
  display: flex;
  gap: 10px;
  .m-transfer-common {
    width: calc(var(--m-transfer-width) * 1px);
    border: 1px solid @bgColor;
    border-radius: 10px;
    overflow: hidden;
    header {
      background-color: @borderColor;
      height: 36px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 10px;
      align-items: center;
      color: @color;
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
    nav {
      background-color: @borderColor;
      height: 36px;
      padding: 5px 10px;
      box-sizing: border-box;
      .m-transfer-input {
        width: 100%;
        height: 22px;
      }
    }
    main {
      width: 100%;
      overflow: hidden;
      height: calc(var(--m-transfer-height) * 1px);
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
    justify-content: center;
  }
  .m-transfer-null {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #333;
    height: 100%;
    cursor: pointer;
  }
}
</style> -->
