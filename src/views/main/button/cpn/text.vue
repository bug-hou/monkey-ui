<template>
  <cpn-play-vue
    title="text"
    :code="textCode"
    description="设置text时你的button就会变成文字，当设置textFixed属性就可以让文字颜色一直保持，也可以通过textColor动态设置颜色，这个属性在button-group中设置是不会传递给button"
  >
    <m-button-group>
      <m-button shape="round" :text="true" type="success" :textFixed="true">
        点一下才有
      </m-button>
      <m-button shape="round" :text="true" type="error"> 点我也可以 </m-button>
      <m-button shape="round" :text="true" type="primary">
        也可以点我
      </m-button>
      <m-button
        shape="round"
        :text="true"
        type="primary"
        textColor="#0ff"
        @click="handleClick"
        :textFixed="click"
      >
        我点击以后颜色就不变了
      </m-button>
    </m-button-group>
  </cpn-play-vue>
</template>

<script lang="ts" setup name="textVue">
/*
 * @Author: bughou
 * @Date: 2022-05-07 15:39:36
 * @Description: 创建一个textVue组件
 */
// 从下载的组件中导入函数
import { ref, unref } from "vue";
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
import { textCode } from "../doc";
const click = ref(false);
function handleClick() {
  click.value = !unref(click);
}
</script>
<style scoped lang="less">
.textVue {
}
</style>
