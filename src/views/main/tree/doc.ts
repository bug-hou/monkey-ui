const value = "`v-${prefix}-${i}`";
const label = "`l-${prefix}-${i}`";

const child = "`${prefix}-${i}`";

const chilValue = "`v-${i}`";
const childName = "`l-${i}`";

const options = `function getOptions(depth = 3, iterator = 1, prefix = ""): any {
  const length = 12;
  const options = [];
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: ${chilValue},
        label: ${childName},
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, "" + String(i))
      });
    } else if (iterator === depth) {
      options.push({
        value: ${value},
        label: ${label},
        disabled: i % 5 === 0
      });
    } else {
      options.push({
        value: ${value},
        label: ${label},
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, ${child})
      });
    }
  }
  return options;
}`


export const baseCode = `
<template>
  <m-radio-group name="buttonmini" v-model="labelRule" button>
    <m-radio value="all">ALL</m-radio>
    <m-radio value="child">CHILD</m-radio>
    <m-radio value="parent">PARENT</m-radio>
  </m-radio-group>
  <br />
  <m-tree
    :options="options"
    v-model="value"
    multiple
    :labelRule="labelRule"
  ></m-tree>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const value = reactive(["v-1/v-1-1/v-1-1-1", "v-1/v-1-1/v-1-1-2"]);

${options}

const options = getOptions();

const labelRule = ref("all");
</script>
`

export const filterCode = `<template>
  <m-tree
    :options="options"
    v-model="value"
    labelRule="child"
    :filter="filter"
  ></m-tree>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
${options}
const value = reactive(["v-1/v-1-1/v-1-1-1", "v-1/v-1-1/v-1-1-2"]);

const options = getOptions();

function filter(str: string) {
return "monkeysUI/" + str;
}
</script>`

export const labelCode = `<template>
  <m-tree
    :options="options"
    v-model="value"
    multiple
    labelName="name"
  ></m-tree>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
${options.replaceAll("label", "name")}
const value = reactive(["v-1/v-1-1/v-1-1-1", "v-1/v-1-1/v-1-1-2"]);

const options = getOptions();

</script>`

export const separatistCode = `<template>
  <m-tree
    :options="options"
    v-model="value"
    labelName="name"
    separatist="++"
  ></m-tree>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
${options}
const value = reactive([]);

const options = getOptions();
</script>`
