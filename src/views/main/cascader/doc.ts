export const labelCode = `<template>
  <m-radio-group name="buttonmini" v-model="labelRule" button>
    <m-radio value="all">ALL</m-radio>
    <m-radio value="child">CHILD</m-radio>
    <m-radio value="parent">PARENT</m-radio>
  </m-radio-group>
  <br />
  <m-cascader
    :options="options"
    v-model="value"
    multiple
    :labelRule="labelRule"
  ></m-cascader>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
function getOptions(depth = 3, iterator = 1, prefix = ""): any {
const length = 12;
const options = [];
for (let i = 1; i <= length; ++i) {
  if (iterator === 1) {
    options.push({
      value: `+ `v-\${ i } ` + `,
      label: `+ `l - \${ i } ` + `,
      disabled: i % 5 === 0,
      children: getOptions(depth, iterator + 1, "" + String(i))
    });
  } else if (iterator === depth) {
    options.push({
      value: `+ `v - \${ prefix } -\${ i } ` + `,
      label: `+ `l - \${ prefix } -\${ i } ` + `,
      disabled: i % 5 === 0
    });
  } else {
    options.push({
      value: `+ `v - \${ prefix } -\${ i } ` + `,
      label: `+ `l - \${ prefix } -\${ i } ` + `,
      disabled: i % 5 === 0,
      children: getOptions(depth, iterator + 1, `+ `\${ prefix } -\${ i } ` + `)
    });
  }
}
return options;
}
const value = reactive(["v-1/v-1-1/v-1-1-1", "v-1/v-1-1/v-1-1-2"]);

const options = getOptions();

const labelRule = ref("all");
</script>
`
export const maxTagCountCode = `<template>
  <m-cascader
    :options="options"
    v-model="value"
    :maxTagCount="5"
    placeholder="maxTagCount的值为5"
  ></m-cascader>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
function getOptions(depth = 3, iterator = 1, prefix = ""): any {
const length = 12;
const options = [];
for (let i = 1; i <= length; ++i) {
  if (iterator === 1) {
    options.push({
      value: `+ `v-\${ i } ` + `,
      label: `+ `l - \${ i } ` + `,
      disabled: i % 5 === 0,
      children: getOptions(depth, iterator + 1, "" + String(i))
    });
  } else if (iterator === depth) {
    options.push({
      value: `+ `v - \${ prefix } -\${ i } ` + `,
      label: `+ `l - \${ prefix } -\${ i } ` + `,
      disabled: i % 5 === 0
    });
  } else {
    options.push({
      value: `+ `v - \${ prefix } -\${ i } ` + `,
      label: `+ `l - \${ prefix } -\${ i } ` + `,
      disabled: i % 5 === 0,
      children: getOptions(depth, iterator + 1, `+ `\${ prefix } -\${ i } ` + `)
    });
  }
}
return options;
}
const value = reactive([]);

const options = getOptions();
</script>`

export const multipleCode = `<template>
  <m-cascader :options="options" v-model="value" multiple></m-cascader>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
function getOptions(depth = 3, iterator = 1, prefix = ""): any {
const length = 12;
const options = [];
for (let i = 1; i <= length; ++i) {
  if (iterator === 1) {
    options.push({
      value: `+ `v-\${ i } ` + `,
      label: `+ `l - \${ i } ` + `,
      disabled: i % 5 === 0,
      children: getOptions(depth, iterator + 1, "" + String(i))
    });
  } else if (iterator === depth) {
    options.push({
      value: `+ `v - \${ prefix } -\${ i } ` + `,
      label: `+ `l - \${ prefix } -\${ i } ` + `,
      disabled: i % 5 === 0
    });
  } else {
    options.push({
      value: `+ `v - \${ prefix } -\${ i } ` + `,
      label: `+ `l - \${ prefix } -\${ i } ` + `,
      disabled: i % 5 === 0,
      children: getOptions(depth, iterator + 1, `+ `\${ prefix } -\${ i } ` + `)
    });
  }
}
return options;
}
const value = reactive(["v-1/v-1-1/v-1-1-1", "v-1/v-1-1/v-1-1-2"]);

const options = getOptions();
</script>
`
export const optionCode = `
<template>
  <m-cascader
    class="cascader"
    :options="options"
    v-model="value"
    size="small"
    placeholder="请选择"
  ></m-cascader>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
function getOptions(depth = 3, iterator = 1, prefix = ""): any {
const length = 12;
const options = [];
for (let i = 1; i <= length; ++i) {
  if (iterator === 1) {
    options.push({
      value: `+ `v-\${ i } ` + `,
      label: `+ `l - \${ i } ` + `,
      disabled: i % 5 === 0,
      children: getOptions(depth, iterator + 1, "" + String(i))
    });
  } else if (iterator === depth) {
    options.push({
      value: `+ `v - \${ prefix } -\${ i } ` + `,
      label: `+ `l - \${ prefix } -\${ i } ` + `,
      disabled: i % 5 === 0
    });
  } else {
    options.push({
      value: `+ `v - \${ prefix } -\${ i } ` + `,
      label: `+ `l - \${ prefix } -\${ i } ` + `,
      disabled: i % 5 === 0,
      children: getOptions(depth, iterator + 1, `+ `\${ prefix } -\${ i } ` + `)
    });
  }
}
return options;
}
const value = reactive([]);

const options = getOptions();
</script>`


export const remoteCode = `<template>
<cpn-play-vue
  title="remote"
  description="当remote为true会等待数据更新，有点复杂我太LOW了不好意思"
  :code="sizeCode"
>
  <m-cascader
    :options="options"
    v-model="value"
    multiple
    remote
    @load="loadHandle"
    :loadOption="loadOption"
    placeholder="请选择"
  ></m-cascader>
</cpn-play-vue>
</template>

<script lang="ts" setup name="size">
/*
* @Author: bughou
* @Date: 2022-05-09 16:07:00
* @Description: 创建一个size组件
*/
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { sizeCode } from "../doc";
import { reactive, ref } from "vue";

function getOptions(deep = 1, count = 2) {
let templateLabel = "l-";
let templateValue = "v-";
for (let i = 0; i < deep; i++) {
  let start = Math.ceil(Math.random() * 100);
  templateLabel += start + "-";
  templateValue += start + "-";
}
const result = [];
for (let i = 0; i < count; i++) {
  result.push({
    label: templateLabel + i,
    value: templateValue + i,
    children: deep !== 3 ? [] : undefined,
    disabled: false,
    deep
  });
}
return result;
}
const value = reactive(["v-1/v-1-1/v-1-1-1", "v-1/v-1-1/v-1-1-2"]);

const options = getOptions();

const loadOption = ref<any[]>([]);

function loadHandle(item: any) {
const deep = item.deep + 1;
setTimeout(() => {
  loadOption.value = getOptions(deep, 12);
}, 2000);
}
</script>
`

export const sizeCode = `
<template>
  <m-cascader :options="options" v-model="value" size="mini"></m-cascader>
  <br />
  <m-cascader :options="options" v-model="value" size="small"></m-cascader>
  <br />
  <m-cascader :options="options" v-model="value" size="medium"></m-cascader>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
function getOptions(depth = 3, iterator = 1, prefix = ""): any {
const length = 12;
const options = [];
for (let i = 1; i <= length; ++i) {
  if (iterator === 1) {
    options.push({
      value: `+ `v-\${ i } ` + `,
      label: `+ `l - \${ i } ` + `,
      disabled: i % 5 === 0,
      children: getOptions(depth, iterator + 1, "" + String(i))
    });
  } else if (iterator === depth) {
    options.push({
      value: `+ `v - \${ prefix } -\${ i } ` + `,
      label: `+ `l - \${ prefix } -\${ i } ` + `,
      disabled: i % 5 === 0
    });
  } else {
    options.push({
      value: `+ `v - \${ prefix } -\${ i } ` + `,
      label: `+ `l - \${ prefix } -\${ i } ` + `,
      disabled: i % 5 === 0,
      children: getOptions(depth, iterator + 1, `+ `\${ prefix } -\${ i } ` + `)
    });
  }
}
return options;
}
const value = reactive([]);

const options = getOptions();
</script>`
