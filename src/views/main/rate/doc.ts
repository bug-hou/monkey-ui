export const colorCode = `<template>
  <m-rate v-model="smallValue" color="#FF416C"></m-rate>
  <m-rate v-model="mediumValue" color="#06beb6"></m-rate>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const miniValue = ref(4.2);
const smallValue = ref(3.7);
const mediumValue = ref(2.5);
</script>
`
export const countCode = `<template>
  <m-rate v-model="smallValue" :count="7"></m-rate>
  <m-rate v-model="mediumValue" :count="3"></m-rate>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const miniValue = ref(4.2);
const smallValue = ref(3.7);
const mediumValue = ref(2.5);
</script>
`
export const readonlyCode = `<template>
  <m-rate v-model="miniValue" readonly></m-rate>
  <m-rate v-model="smallValue" readonly></m-rate>
  <m-rate v-model="mediumValue" readonly></m-rate>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const miniValue = ref(4.2);
const smallValue = ref(3.7);
const mediumValue = ref(2.5);
</script>
`

export const showCode = `<template>
  <m-rate v-model="miniValue" show>
    <template #default="{ precent }"> 你当前评分为{{ precent }} </template>
  </m-rate>
  <m-rate v-model="smallValue" show suffix="分"></m-rate>
  <m-rate v-model="mediumValue" show></m-rate>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const miniValue = ref(4.2);
const smallValue = ref(3.7);
const mediumValue = ref(2.5);
</script>
`

export const sizeCode = `<template>
  <m-rate v-model="miniValue" size="mini"></m-rate>
  <m-rate v-model="smallValue" size="small"></m-rate>
  <m-rate v-model="mediumValue" size="medium"></m-rate>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const miniValue = ref(4);
const smallValue = ref(3);
const mediumValue = ref(2);
</script>
`
export const typeCode = `<template>
  <m-rate v-model="miniValue" show type="all">
    <template #default="{ precent }"> 你当前评分为{{ precent }} </template>
  </m-rate>
  <m-rate v-model="smallValue" show suffix="分" type="half"></m-rate>
  <m-rate v-model="mediumValue" show type="wantonly"></m-rate>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const miniValue = ref(4.2);
const smallValue = ref(3.7);
const mediumValue = ref(2.5);
</script>
`
