export const sizeCode = `<m-button-group>
  <m-button size="mini" type="success">小小按钮</m-button>
  <m-button size="small" type="error">小按钮</m-button>
  <m-button size="medium" type="primary">中等按钮</m-button>
  <m-button size="big" type="info">大大的按钮</m-button>
</m-button-group>`
export const typeCode = `<m-button-group class="type">
  <m-button>default</m-button>
  <m-button type="success">success</m-button>
  <m-button type="error">error</m-button>
  <m-button type="primary">primary</m-button>
  <m-button type="info">info</m-button>
  <m-button type="warning">warning</m-button>
</m-button-group>`
export const shapeCode = `<m-button-group class="type" shape="rect">
  <m-button>default</m-button>
  <m-button type="success">success</m-button>
  <m-button type="error">error</m-button>
  <m-button type="primary">primary</m-button>
  <m-button type="info">info</m-button>
  <m-button type="warning">warning</m-button>
  </m-button-group>
  <m-button-group class="type" shape="round">
  <m-button>default</m-button>
  <m-button type="success">success</m-button>
  <m-button type="error">error</m-button>
  <m-button type="primary">primary</m-button>
  <m-button type="info">info</m-button>
  <m-button type="warning">warning</m-button>
  </m-button-group>
  <m-button-group class="type" shape="arc">
  <m-button>default</m-button>
  <m-button type="success">success</m-button>
  <m-button type="error">error</m-button>
  <m-button type="primary">primary</m-button>
  <m-button type="info">info</m-button>
  <m-button type="warning">warning</m-button>
  </m-button-group>
  <m-button-group class="type" shape="circle">
  <m-button>D</m-button>
  <m-button type="success">S</m-button>
  <m-button type="error">E</m-button>
  <m-button type="primary">P</m-button>
  <m-button type="info">I</m-button>
  <m-button type="warning">W</m-button>
</m-button-group>`
export const plainCode = `<m-button-group :plain="false">
  <m-button>default</m-button>
  <m-button type="success">success</m-button>
  <m-button type="error">error</m-button>
  <m-button type="primary">primary</m-button>
  <m-button type="info">info</m-button>
  <m-button type="warning">warning</m-button>
  <m-button color="#40fafa" borderColor="#40fafa">warning</m-button>
</m-button-group>`
export const iconCode = `<m-button-group :plain="false">
  <m-button type="success" shape="rect">
    <m-icon name="m-upload"></m-icon>
    成功的上传
  </m-button>
  <m-button type="info" shape="round">
    <m-icon name="m-upload"></m-icon>
    上传信息哦
  </m-button>
  <m-button type="warning" shape="arc">
    <m-icon name="m-upload"></m-icon>
    是一个警告
  </m-button>
  <m-button type="error" shape="circle">
    <m-icon name="m-upload"></m-icon>
  </m-button>
</m-button-group>`
export const loadingCode = `<m-button-group :plain="false" shape="round">
  <m-button @click="handleClick" :loading="loading" loadingName="loop">
    点一下才有
  </m-button>
  <m-button @click="handleClick" :loading="loading" type="error">
    点我也可以
  </m-button>
  <m-button
    @click="handleClick"
    :loading="loading"
    type="primary"
    loadingName="grow"
  >
    也可以点我
  </m-button>
  <m-button
    @click="handleClick"
    :loading="loading"
    type="success"
    loadingName="slow"
  >
    两秒就没有了
  </m-button>
  </m-button-group>
  <m-button-group :plain="false" shape="round">
  <m-button @click="handleClick" :loading="loading" loadingName="deep"
    >点一下才有</m-button
  >
  <m-button
    @click="handleClick"
    :loading="loading"
    type="error"
    loadingName="top"
  >
    点我也可以
  </m-button>
  <m-button
    @click="handleClick"
    :loading="loading"
    type="primary"
    loadingName="long"
  >
    也可以点我
  </m-button>
  <m-button
    @click="handleClick"
    :loading="loading"
    type="success"
    loadingName="short"
  >
    两秒就没有了
  </m-button>
</m-button-group>
<script setup>
  const loading = ref(false);
  function handleClick() {
    loading.value = true;
    setTimeout(() => (loading.value = false), 1000);
  }
</script>
`
export const slotCode = `<m-button-group :plain="false" shape="round">
  <m-button @click="handleClick" :loading="loading">
    <template #icon>
      <m-icon name="m-upload"></m-icon>
    </template>
    点一下才有
  </m-button>
  <m-button @click="handleClick" :loading="loading" type="error">
    <template #icon>
      <m-icon name="m-upload"></m-icon>
    </template>
    点我也可以
  </m-button>
  <m-button @click="handleClick" :loading="loading" type="primary">
    <template #icon>
      <m-icon name="m-upload"></m-icon>
    </template>
    也可以点我
  </m-button>
</m-button-group>
<script setup>
  const loading = ref(false);
  function handleClick() {
    loading.value = true;
    setTimeout(() => (loading.value = false), 1000);
  }
</script>`
export const disabledCode = `<m-button-group>
  <m-button disabled>我不能点击</m-button>
  <m-button disabled :plain="false">我不能点击</m-button>
</m-button-group>`
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
