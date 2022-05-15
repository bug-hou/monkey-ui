export const sizeCode = `<div class="size">
  <m-input-number class="common" v-model="a" size="mini"></m-input-number>
  <m-input-number class="common" v-model="a" size="small"></m-input-number>
  <m-input-number class="common" v-model="a" size="medium"></m-input-number>
</div>
<script setup>
import { ref } from "vue";
const a = ref(1);
</script>
<style scoped lang="less">
.size {
  display: flex;
  .common {
    margin-right: 20px;
  }
}
</style>
`

export const fixedCode = `<div class="size">
  <m-input-number
    class="common"
    v-model="a"
    :max="10"
    :fixed="2"
    controlsPosition="left"
  ></m-input-number>
  <m-input-number
    class="common"
    :min="1"
    :fixed="2"
    v-model="b"
    controlsPosition="right"
  ></m-input-number>
  <m-input-number
    class="common"
    v-model="c"
    :fixed="2"
    :max="10"
    :min="1"
  ></m-input-number>
</div>
<script setup>
import { ref } from "vue";
const a = ref(1.25);
const b = ref(5.23);
const c = ref(8.23);
</script>
<style scoped lang="less">
.size {
display: flex;
.common {
  margin-right: 20px;
}
}
</style>
`

export const disabledCode = `<div class="size">
  <m-input-number class="common" v-model="a" disabled></m-input-number>
  <m-input-number
    class="common"
    v-model="a"
    disabled
    controlsPosition="left"
  ></m-input-number>
  <m-input-number
    class="common"
    v-model="a"
    disabled
    controlsPosition="right"
  ></m-input-number>
</div>
<script setup>
import { ref } from "vue";
const a = ref(1);
</script>
<style scoped lang="less">
.size {
  display: flex;
  .common {
    margin-right: 20px;
  }
}
</style>
`
export const stepCode = `<div class="size">
  <m-input-number
    class="common"
    v-model="a"
    :step="2"
    controlsPosition="left"
  ></m-input-number>
  <m-input-number
    class="common"
    :step="10"
    v-model="b"
    controlsPosition="right"
  ></m-input-number>
  <m-input-number class="common"
   :step="5" v-model="c">
  </m-input-number>
</div>
<script setup>
import { ref } from "vue";
const a = ref(10);
const b = ref(5);
const c = ref(8);
</script>
<style scoped lang="less">
.size {
  display: flex;
  .common {
    margin-right: 20px;
  }
}
</style>
`
export const maxMinCode = `<div class="size">
  <m-input-number class="common" v-model="a" :max="10"></m-input-number>
  <m-input-number class="common" :min="1" v-model="b"></m-input-number>
  <m-input-number
    class="common"
    v-model="c"
    :max="10"
    :min="1"
  ></m-input-number>
</div>
<script setup>
// import { sizeCode } from "../doc";
import { ref } from "vue";
const a = ref(0);
const b = ref(0);
const c = ref(0);
</script>
<style scoped lang="less">
.size {
  display: flex;
  .common {
    margin-right: 20px;
  }
}
</style>
`

export const positionCode = `<div class="size">
<m-input-number
  class="common"
  v-model="a"
  :max="10"
  controlsPosition="left"
></m-input-number>
<m-input-number
  class="common"
  :min="1"
  v-model="b"
  controlsPosition="right"
></m-input-number>
<m-input-number
  class="common"
  v-model="c"
  :max="10"
  :min="1"
></m-input-number>
</div>
<script setup>
import { ref } from "vue";
const a = ref(0);
const b = ref(0);
const c = ref(0);
</script>
<style scoped lang="less">
.size {
  display: flex;
  .common {
    margin-right: 20px;
  }
}
</style>`
