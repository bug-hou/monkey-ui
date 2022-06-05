export const sizeCode = `<template>
  <m-button-group class="size">
    <m-button shape="round" size="mini" type="success">小小按钮</m-button>
    <p class="gap"></p>
    <m-button shape="round" size="small" type="error">小按钮</m-button>
    <p class="gap"></p>
    <m-button shape="round" size="medium" type="primary">中等按钮</m-button>
    <p class="gap"></p>
    <m-button shape="round" size="big" type="info">大大的按钮</m-button>
  </m-button-group>
</template>

<style scoped lang="less">
.gap {
width: 20px;
}
</style>
`
export const typeCode = `<template>
  <m-button-group class="type">
    <m-button>default</m-button>
    <p class="gap"></p>
    <m-button type="success">success</m-button>
    <p class="gap"></p>
    <m-button type="error">error</m-button>
    <p class="gap"></p>
    <m-button type="primary">primary</m-button>
    <p class="gap"></p>
    <m-button type="info">info</m-button>
    <p class="gap"></p>
    <m-button type="warning">warning</m-button>
  </m-button-group>
</template>

<style scoped>
.gap {
width: 20px;
}
</style>
`
export const shapeCode = `<template>
  <m-button-group class="type" shape="rect">
    <m-button>default</m-button>
    <p class="gap"></p>
    <m-button type="success">success</m-button>
    <p class="gap"></p>
    <m-button type="error">error</m-button>
    <p class="gap"></p>
    <m-button type="primary">primary</m-button>
    <p class="gap"></p>
    <m-button type="info">info</m-button>
    <p class="gap"></p>
    <m-button type="warning">warning</m-button>
  </m-button-group>
  <br />
  <br />
  <m-button-group class="type" shape="round">
    <m-button>default</m-button>
    <p class="gap"></p>
    <m-button type="success">success</m-button>
    <p class="gap"></p>
    <m-button type="error">error</m-button>
    <p class="gap"></p>
    <m-button type="primary">primary</m-button>
    <p class="gap"></p>
    <m-button type="info">info</m-button>
    <p class="gap"></p>
    <m-button type="warning">warning</m-button>
  </m-button-group>
  <br />
  <br />
  <m-button-group class="type" shape="arc">
    <m-button>default</m-button>
    <p class="gap"></p>
    <m-button type="success">success</m-button>
    <p class="gap"></p>
    <m-button type="error">error</m-button>
    <p class="gap"></p>
    <m-button type="primary">primary</m-button>
    <p class="gap"></p>
    <m-button type="info">info</m-button>
    <p class="gap"></p>
    <m-button type="warning">warning</m-button>
  </m-button-group>
  <br />
  <br />
  <m-button-group class="type" shape="circle">
    <m-button>D</m-button>
    <p class="gap"></p>
    <m-button type="success">S</m-button>
    <p class="gap"></p>
    <m-button type="error">E</m-button>
    <p class="gap"></p>
    <m-button type="primary">P</m-button>
    <p class="gap"></p>
    <m-button type="info">I</m-button>
    <p class="gap"></p>
    <m-button type="warning">W</m-button>
  </m-button-group>
</template>

<style scoped lang="less">
.gap {
width: 20px;
}
</style>
`
export const plainCode = `<template>
  <m-button-group :plain="false" shape="round">
    <m-button>default</m-button>
    <p class="gap"></p>
    <m-button type="success">success</m-button>
    <p class="gap"></p>
    <m-button type="error">error</m-button>
    <p class="gap"></p>
    <m-button type="primary">primary</m-button>
    <p class="gap"></p>
    <m-button type="info">info</m-button>
    <p class="gap"></p>
    <m-button type="warning">warning</m-button>
  </m-button-group>
</template>

<style scoped lang="less">
.gap {
width: 20px;
}
</style>
`
export const iconCode = `<template>
  <m-button-group :plain="false">
    <m-button type="success" shape="rect">
      <m-icon name="m-upload"></m-icon>
      成功的上传
    </m-button>
    <p class="gap"></p>
    <m-button type="info" shape="round">
      <m-icon name="m-upload"></m-icon>
      上传信息哦
    </m-button>
    <p class="gap"></p>
    <m-button type="warning" shape="arc">
      <m-icon name="m-upload"></m-icon>
      是一个警告
    </m-button>
    <p class="gap"></p>
    <m-button type="error" shape="circle">
      <m-icon name="m-upload"></m-icon>
    </m-button>
  </m-button-group>
</template>

<style scoped lang="less">
.gap {
display: inline-block;
width: 30px;
}
</style>
`
export const loadingCode = `<template>
<cpn-play-vue
  :code="loadingCode"
  title="loading"
  description="一个好的button少不了loading状态，目前来说只有7种short(默认)，loop，top，grow，slow，deep，long，"
>
  <m-button-group :plain="false" shape="round">
    <m-button @click="handleClick" :loading="loading" loadingName="loop">
      点一下-loop
    </m-button>
    <p class="gap"></p>
    <m-button @click="handleClick" :loading="loading" type="error">
      点我呀-short
    </m-button>
    <p class="gap"></p>
    <m-button
      @click="handleClick"
      :loading="loading"
      type="primary"
      loadingName="grow"
    >
      我也行-grow
    </m-button>
    <p class="gap"></p>
    <m-button
      @click="handleClick"
      :loading="loading"
      type="success"
      loadingName="slow"
    >
      我有点慢-slow
    </m-button>
  </m-button-group>
  <br />
  <br />
  <m-button-group :plain="false" shape="round">
    <m-button @click="handleClick" :loading="loading" loadingName="deep"
      >看我-deep</m-button
    >
    <p class="gap"></p>
    <m-button
      @click="handleClick"
      :loading="loading"
      type="error"
      loadingName="top"
    >
      我在上面-top
    </m-button>
    <p class="gap"></p>
    <m-button
      @click="handleClick"
      :loading="loading"
      type="primary"
      loadingName="long"
    >
      我长-long
    </m-button>
    <p class="gap"></p>
    <m-button
      @click="handleClick"
      :loading="loading"
      type="success"
      loadingName="short"
    >
      两秒就无-short
    </m-button>
  </m-button-group>
  <template #code>
    <pre v-highlight="loadingCode"></pre>
  </template>
</cpn-play-vue>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const loading = ref(false);
function handleClick() {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
}
</script>
<style scoped lang="less">
.gap {
display: inline-block;
width: 10px;
}
</style>
`
export const slotCode = `<template>
  <m-button-group :plain="false" shape="round">
    <m-button @click="handleClick" :loading="loading">
      <template #icon>
        <m-icon name="m-upload"></m-icon>
      </template>
      点一下才有
    </m-button>
    <p class="gap"></p>
    <m-button @click="handleClick" :loading="loading" type="error">
      <template #icon>
        <m-icon name="m-upload"></m-icon>
      </template>
      点我也可以
    </m-button>
    <p class="gap"></p>
    <m-button @click="handleClick" :loading="loading" type="primary">
      <template #icon>
        <m-icon name="m-upload"></m-icon>
      </template>
      也可以点我
    </m-button>
  </m-button-group>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const loading = ref(false);
function handleClick() {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
}
</script>
<style scoped lang="less">
.gap {
width: 20px;
}
</style>
`
export const disabledCode = `
<template>
  <m-button-group>
    <m-button disabled>我不能点击</m-button>
    <p class="gap"></p>
    <m-button disabled :plain="false">我不能点击</m-button>
  </m-button-group>
</template>

<style scoped lang="less">
.gap {
  display: inline-block;
  width: 30px;
}
</style>
`
export const textCode = `<m-button-group>
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
<script setup>
  import { ref, unref } from "vue";
  const click = ref(false);
  function handleClick() {
    click.value = !unref(click);
  }
</script>
`
