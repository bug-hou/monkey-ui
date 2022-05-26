export const sizeCode = `<m-pagination
  size="mini"
  :count="100"
  :defaultPageSize="6"
  v-model="page"
  ></m-pagination>
  <br />
  <m-pagination
  size="small"
  :count="100"
  :defaultPageSize="6"
  v-model="page"
  ></m-pagination>
  <br />
  <m-pagination
  size="medium"
  :count="100"
  :defaultPageSize="6"
  v-model="page"
></m-pagination>
<script setup>
import { ref } from "vue";
const page = ref(1);
</script>`

export const backCode = `<m-pagination
  size="mini"
  :count="100"
  :defaultPageSize="6"
  v-model="page"
  useBack
  ></m-pagination>
  <br />
  <m-pagination
  size="small"
  :count="100"
  :defaultPageSize="6"
  useBack
  v-model="page"
  ></m-pagination>
  <br />
  <m-pagination
  size="medium"
  :count="100"
  useBack
  :defaultPageSize="6"
  v-model="page"
></m-pagination>
<script lang="ts" setup name="baseVue">
  import { ref } from "vue";
  const page = ref(1);
</script>`

export const intervalCode = `<m-pagination
  size="mini"
  :count="10"
  :defaultPageSize="6"
  v-model="page"
  interval="10px"
  ></m-pagination>
  <br />
  <m-pagination
  size="small"
  :count="5"
  :defaultPageSize="5"
  useBack
  interval="20px"
  v-model="page"
></m-pagination>
<script setup>
import { ref } from "vue";
const page = ref(1);
</script>`
