export const sizeCode = `<template>
  <m-tag size="mini">天道酬勤</m-tag>
  <span></span>
  <m-tag size="mini">恒则必远</m-tag>
  <span></span>
  <m-tag size="small">功不唐娟</m-tag>
  <span></span>
  <m-tag size="small">玉汝于成</m-tag>
  <span></span>
  <m-tag size="medium">岁月不负追梦人</m-tag>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const switchValue = ref(true);
</script>
<style lang="less" scoped>
span {
width: 20px;
display: inline-block;
}
</style>`;

export const typeCode = `<template>
  <template v-for="(item, index) in list" :key="index">
    <m-tag :type="item.type">{{ item.name }}</m-tag>
    <span></span>
  </template>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
const list = reactive([
{ name: "昨天已成过去", type: "error" },
{ name: "明天还未到来", type: "info" },
{ name: "今天你能改变", type: "primary" },
{ name: "每天都要加油", type: "success" }
]);
</script>
<style lang="less" scoped>
span {
width: 20px;
display: inline-block;
}
</style>
`;
export const roundedCode = `<template>
  <template v-for="(item, index) in list" :key="index">
    <m-tag rounded>{{ item }}</m-tag>
    <span></span>
  </template>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
const list = reactive(["大雨如期而至", "悲观如梦而袭"]);
</script>
<style lang="less" scoped>
span {
width: 20px;
display: inline-block;
}
</style>
`

export const effectCode = `<template>
  <template v-for="(item, index) in list" :key="index">
    <m-tag :effect="item.effect" closabled>{{ item.name }}</m-tag>
    <span></span>
  </template>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
const list = reactive([
{ name: "Tag dart", effect: "dart" },
{ name: "Tag light", effect: "light" },
{ name: "Tag plain", effect: "plain" }
]);
</script>
<style lang="less" scoped>
span {
width: 20px;
display: inline-block;
}
</style>
`

export const disabledCode = `<template>
  <template v-for="(item, index) in list" :key="index">
    <m-tag :type="item.type" :disabled="!isDisabled">{{ item.name }}</m-tag>
    <span></span>
  </template>
  <m-switch v-model="isDisabled" style="vertical-align: top"></m-switch>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
const isDisabled = ref(true);
const list = reactive([
{ name: "昨天已成过去", type: "error" },
{ name: "明天还未到来", type: "info" },
{ name: "今天你能改变", type: "primary" },
{ name: "每天都要加油", type: "success" }
]);
</script>
<style lang="less" scoped>
span {
width: 20px;
display: inline-block;
}
</style>
`

export const closabledCode = `<template>
  <template v-for="(item, index) in list" :key="index">
    <m-tag closabled @close="closeHandle(index)">{{ item }}</m-tag>
    <span></span>
  </template>
  <m-input
    placeholder="+ Tag"
    v-model="tag"
    @keydown.enter="keyDownHandle"
    size="mini"
    style="width: 100px; height: 28px"
  ></m-input>
</template>

<script lang="ts" setup name="baseVue">
import { reactive, ref } from "vue";
const tag = ref("");
const list = reactive(["Tag 1", "Tag 2", "Tag 3", "Tag 4"]);
function keyDownHandle() {
if (tag.value) {
  list.push(tag.value);
  tag.value = "";
}
}
function closeHandle(index: number) {
list.splice(index, 1);
}
</script>
<style lang="less" scoped>
span {
width: 20px;
display: inline-block;
}
</style>
`
