export const sizeCode = `<m-input
v-model="a"
placeholder="我可能是最小的"
size="mini"
index="1"
></m-input>
<br>
<m-input
v-model="a"
placeholder="我就中等大小和平时使用的差不多"
size="small"
index="5"
></m-input>
<br>
<m-input
v-model="a"
placeholder="我是超大杯哦pro哦"
size="medium"
index="3"
></m-input>
<script setup>
import {ref} from "vue"
const a = ref('');
</script>
`
export const fixCode = `<m-input v-model="a" placeholder="我可以定义前缀哦" prefix="http">
</m-input>
<br />
<m-input
  v-model="a"
  placeholder="后缀和前缀"
  prefix="你的名字"
  suffix="你的名字"
>
</m-input>
<br />
<m-input
  v-model="a"
  placeholder="红色配绿色绝配"
  prefix="红色前缀"
  prefixColor="red"
  prefixTextColor="white"
  suffix="绿色后缀"
  suffixColor="green"
  suffixTextColor="white"
>
</m-input>
<br />
<m-input
  v-model="a"
  placeholder="button加上input的火花"
  prefix
  prefixColor="red"
  prefixTextColor="white"
  suffix
  suffixColor="green"
  suffixTextColor="white"
>
  <template #prefix>
    <m-button type="success">前缀</m-button>
  </template>
  <template #suffix>
    <m-button color="rgb(48, 170, 105)">后缀</m-button>
  </template>
</m-input>
</m-input>
<script setup>
import {ref} from "vue"
const a = ref('');
</script>
`
export const clearCode = `<m-input
v-model="a"
clear
placeholder="你要输入才显示clear按钮哦"
></m-input>
<br />
<m-input
v-model="a"
clear
prefix=" https://"
suffix=".com"
placeholder="我是同时拥有的组件"
>
</m-input>
<br />
<m-input
v-model="a"
type="password"
password
placeholder="同时设置了优先显示password"
></m-input>
<script setup>
import {ref} from "vue"
const a = ref('');
</script>
`
export const disabledCode = `<m-input v-model="a" disabled placeholder="你点不动我了吧"></m-input>
<br />
<m-input
  v-model="a"
  disabled
  placeholder="你点不动我了吧"
  suffix="禁止"
  prefix="点不了"
>
</m-input>
<script setup>
import {ref} from "vue"
const a = ref('');
</script>
`
export const limitCode = `<m-input
v-model="a"
:maxLength="10"
placeholder="我只能输入10个字"
></m-input>
<br />
<m-input
v-model="a"
:maxLength="10"
placeholder="10个字，不能多输入哦"
suffix="字"
prefix="10"
>
</m-input>
<script setup>
import {ref} from "vue"
const a = ref('');
</script>`
export const loadingCode = `<m-input v-model="a" loading placeholder="我动画一直显示"></m-input>
<br />
<m-input v-model="a" :loading="loading" placeholder="只要你输入我就有动画">
</m-input>
<script setup>
import { ref, watch } from "vue";
const a = ref("");
const loading = ref(false);
let timer: any;
watch(a, () => {
  loading.value = true;
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => (loading.value = false), 1000);
});
</script>`
export const roundCode = `<template>
  <m-input v-model="a" placeholder="我是一个圆角输入框" round></m-input>
  <br />
  <m-input v-model="a" radius="20px" placeholder="自定义radius属性"> </m-input>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const a = ref("");
</script>`
export const listCode = ` <m-input
v-model="a"
placeholder="我是一个圆角输入框"
:list="showListOne"
round
suffix="列表数据"
>
<template #list="{ value }">
  <p>
    <span class="strong">{{ a }}</span>
    <span>{{ value.slice(a.length) }}</span>
  </p>
</template>
</m-input>
<br />
<m-input
v-model="b"
radius="20px"
:list="listTwo"
placeholder="自定义radius属性"
>
</m-input>
<script>
import { reactive, ref, watch } from "vue";
const a = ref("");
const b = ref("");
const listOne = reactive([
  "html",
  "css",
  "javascript",
  "java",
  "php",
  "typescript",
  "c++",
  "golang"
]);
let showListOne = ref([...listOne]);
const listTwo = reactive([
  "input",
  "button",
  "avatar",
  "icon",
  "inputNumber",
  "slider",
  "update"
]);
watch(a, () => {
  showListOne.value = [...listOne.filter((item) => item.startsWith(a.value))];
});
</script>
<style scoped lang="less">
.strong {
  color: #409eff;
  font-weight: bold;
}
</style>
`
