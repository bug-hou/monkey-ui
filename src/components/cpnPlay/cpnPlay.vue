<!-- base -->
<template>
  <div>
    <div
      class="base"
      :class="active && 'active'"
      @click="handleClick"
      @mouseleave="handleLeave"
    >
      <header>
        <h2 :id="title">{{ initialCapital(title) }}属性</h2>
        <div class="descriptor" v-description="description"></div>
        <div class="operate">
          <m-icon-group color="black" size="medium">
            <m-tooltip tooltipText="复制代码" effect="dark">
              <m-icon name="icon-fuzhi" @click="copyText"></m-icon>
            </m-tooltip>
            <span class="gay"></span>
            <m-tooltip tooltipText="显示代码" effect="dark">
              <m-icon name="icon-code" @click="handleClickCode"></m-icon>
            </m-tooltip>
          </m-icon-group>
        </div>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer :class="showCode && 'show'" :style="{ ['--height']: height }">
        <div ref="footerRef">
          <pre v-highlight="code"></pre>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { withDefaults, defineProps, Directive, ref, onMounted } from "vue";
import { initialCapital } from "../../utils";
const props = withDefaults(
  defineProps<{
    title: string;
    description: string;
    code: string;
  }>(),
  {}
);
const height = ref("0px");
const vDescription: Directive = {
  mounted(el: HTMLElement, binding) {
    const reg = /[a-z]*/gi;
    el.innerHTML = (binding.value as string).replace(
      reg,
      (match) => match && `<code>${match}</code>`
    );
  }
};
const showCode = ref(false);
function handleClickCode() {
  showCode.value = !showCode.value;
}
const footerRef = ref<InstanceType<typeof HTMLElement>>();
onMounted(() => {
  height.value = getComputedStyle(footerRef.value!).height;
});
function copyText() {
  var text = props.code;
  // 1. 创建并添加一个输入框元素(最后会销毁)
  const textareaEle = document.createElement("textarea");
  document.body.appendChild(textareaEle);
  // 2. 将需要复制的文本传入输入框, 并调用 select 方法, 选中输入框中文本
  textareaEle.value = text;
  textareaEle.select();
  textareaEle.readOnly = true;
  // 3. 调用复制选中文本的方法
  document.execCommand("copy");
  // 4. 销毁输入框
  document.body.removeChild(textareaEle);
}
const active = ref(false);
function handleClick() {
  active.value = true;
}
function handleLeave() {
  active.value = false;
}
</script>
<style scoped lang="less">
.base {
  margin: 2rem 0;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  width: 100%;
  &.active {
    border-color: #409eff;
  }
  header {
    width: 100%;
    border-bottom: 1px solid #dcdfe6;
    padding: 5px 10px;
    box-sizing: border-box;
    position: relative;
    color: #606266;
    .operate {
      position: absolute;
      right: 20px;
      top: 5px;
      .gay {
        display: inline-block;
        padding: 0 5px;
      }
    }
    h2 {
      font-size: 25px;
    }
    p {
      margin-top: 10px;
      font-size: 14px;
    }
    .descriptor {
      margin: 10px 0;
      letter-spacing: 2px;
      font-size: 14px;
      color: #40444c;
    }
  }
  main {
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
  }
  footer {
    transition: all 1s;
    height: 0;
    overflow: hidden;
    transition: height 1s;
    &.show {
      border-top: 1px solid #dcdfe6;
      height: var(--height);
    }
  }
}
</style>
