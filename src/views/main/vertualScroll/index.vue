<template>
  <div class="card">
    <cpn-header-vue
      title="tag"
      name="标签"
      description="标签用来对一些特殊事物起强调作用"
    >
    </cpn-header-vue>
    <m-vertual-scroll
      :options="options"
      style="width: 300px"
    ></m-vertual-scroll>
    <div class="layout"></div>
  </div>
</template>

<script lang="ts" setup>
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
// import effectVue from "./cpn/effect.vue";
// import triggerVue from "./cpn/trigger.vue";
// import delayVue from "./cpn/delay.vue";
// import arrowVue from "./cpn/arrow.vue";
// import listVue from "./cpn/list.vue";
// import scrollVue from "./cpn/scroll.vue";
// import headerVue from "./cpn/header.vue";
// import directionVue from "./cpn/direction.vue";

function getOptions(prefix = "option") {
  let options = [];
  for (let i = 0; i < 1500; i++) {
    options.push(prefix + (i + 1));
  }
  return options;
}

const options = getOptions();
</script>
<style scoped lang="less"></style>
