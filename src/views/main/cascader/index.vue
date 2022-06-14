<template>
  <div>
    <cpn-header-vue title="cascader" name="级联选择" description="用来选择多个">
    </cpn-header-vue>
    <!-- <m-cascader
      :options="options"
      v-model="value"
      @load="loadhandle"
      :loadOption="loadOption"
    ></m-cascader> -->
    <div class="layout">
      <size-vue></size-vue>
      <label-vue></label-vue>
      <multiple-vue></multiple-vue>
      <option-vue></option-vue>
      <remote-vue></remote-vue>
      <max-tag-count-vue></max-tag-count-vue>
    </div>
  </div>
</template>

<script lang="ts" setup name="card">
/*
 * @Author: bughou
 * @Date: 2022-05-09 18:42:15
 * @Description: 创建一个card组件
 */
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
import sizeVue from "./cpn/size.vue";
import labelVue from "./cpn/label.vue";
import multipleVue from "./cpn/multiple.vue";
import optionVue from "./cpn/option.vue";
import remoteVue from "./cpn/remote.vue";
import maxTagCountVue from "./cpn/maxTagCount.vue";
</script>
<style scoped lang="less"></style>
