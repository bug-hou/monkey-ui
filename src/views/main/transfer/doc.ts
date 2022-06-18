export const baseCode = `
<template>
  <m-transfer
    v-model:originOptions="originOptions"
    v-model:targetOptions="targetOttions"
  ></m-transfer>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

function getOptions(prefix = "option") {
let options = [];
for (let i = 0; i < 10; i++) {
  const obj: any = {
    label: prefix + (i + 1),
    value: "v-" + prefix + (i + 1),
    disabled: !Math.round(Math.random() * 3)
  };
  options.push(obj);
}
return options;
}

const originOptions = reactive(getOptions());
const targetOttions = reactive(getOptions("target"));
</script>
`;

export const filterCode = `<template>
  <m-transfer
    :height="250"
    :width="200"
    v-model:originOptions="originOptions"
    v-model:targetOptions="targetOttions"
    filterable
  ></m-transfer>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

function getOptions(prefix = "option") {
  let options = [];
  for (let i = 0; i < 10; i++) {
    const obj: any = {
      label: prefix + (i + 1),
      value: "v-" + prefix + (i + 1),
      disabled: !Math.round(Math.random() * 3)
    };
    options.push(obj);
  }
  return options;
}

const originOptions = reactive(getOptions());
const targetOttions = reactive(getOptions("target"));
</script>
`

export const initialCode = `<template>
  <m-transfer
    v-model:originOptions="originOptions"
    v-model:targetOptions="targetOttions"
    :originValue="originValue"
    :targetValue="targetValue"
  ></m-transfer>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

function getOptions(prefix = "option") {
  let options = [];
  for (let i = 0; i < 10; i++) {
    const obj: any = {
      label: prefix + (i + 1),
      value: "v-" + prefix + (i + 1),
      disabled: !Math.round(Math.random() * 3)
    };
    options.push(obj);
  }
  return options;
}

const originOptions = reactive(getOptions());
const targetOttions = reactive(getOptions("target"));

const originValue = ["v-option5"];
const targetValue = ["v-target1"];
</script>
`
