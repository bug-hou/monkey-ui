export const footerCode = `<m-card class="card">
<template #header> 我是header部分 </template>
我就是内容，你可以随便写点东西，部分看起来很单调
<template #footer>我是footer部分</template>
</m-card>
<style>
.card {
  width: 300px;
}
</style>`
export const imageCode = `<m-card class="card">
  <template #cover>
    <img src="../config/vue.png" alt="" />
  </template>
  <template #header> VUE </template>
  vue永远滴神哈哈哈哈哈(纯娱乐不迎战)
  </m-card>
  <m-card class="card">
  <template #cover>
    <img src="../config/react.png" alt="" />
  </template>
  <template #header> REACT </template>
  react也很好用，我要卷加油
</m-card>
<style scoped lang="less">
.card {
  width: 250px;
  display: inline-block;
  margin-left: 10px;
  &:first-child {
    margin-left: 0;
  }
}
img {
  width: 100%;
}
</style>
`
export const typeCode = `<m-card class="card">
<template #header> 卡片 </template>
默认卡片
</m-card>
<m-card type="always" class="card">
<template #header> 卡片 </template>
always卡片</m-card
>
<m-card type="hover" class="card">
<template #header> 卡片 </template>
hover卡片</m-card
>
<m-card type="click" class="card">
<template #header> 卡片 </template>
click卡片</m-card
>
<style scoped lang="less">
.card {
  display: inline-block;
  width: 240px;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>`
