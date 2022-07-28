export const baseCode = `<template>
  <m-list>
    <m-list-item>
      <div class="list-div">
        <m-list>
          <m-list-item>腾讯</m-list-item>
          <m-list-item>字节</m-list-item>
          <m-list-item>阿里</m-list-item>
          <m-list-item>百度</m-list-item>
        </m-list>
        <m-list type="disc">
          <m-list-item>腾讯</m-list-item>
          <m-list-item>字节</m-list-item>
          <m-list-item>阿里</m-list-item>
          <m-list-item>百度</m-list-item>
        </m-list>
        <m-list type="decimal">
          <m-list-item>腾讯</m-list-item>
          <m-list-item>字节</m-list-item>
          <m-list-item>阿里</m-list-item>
          <m-list-item>百度</m-list-item>
        </m-list>
      </div>
    </m-list-item>
    <m-list-item>
      <div class="list-div">
        <m-list type="circle">
          <m-list-item>腾讯</m-list-item>
          <m-list-item>字节</m-list-item>
          <m-list-item>阿里</m-list-item>
          <m-list-item>百度</m-list-item>
        </m-list>
        <m-list type="square">
          <m-list-item>腾讯</m-list-item>
          <m-list-item>字节</m-list-item>
          <m-list-item>阿里</m-list-item>
          <m-list-item>百度</m-list-item>
        </m-list>
        <m-list type="divider">
          <m-list-item>腾讯</m-list-item>
          <m-list-item>字节</m-list-item>
          <m-list-item>阿里</m-list-item>
          <m-list-item>百度</m-list-item>
        </m-list>
      </div>
    </m-list-item>
    <m-list-item>
      <div class="list-div">
        <m-list type="stripe">
          <m-list-item>腾讯</m-list-item>
          <m-list-item>字节</m-list-item>
          <m-list-item>阿里</m-list-item>
          <m-list-item>百度</m-list-item>
        </m-list>
      </div>
    </m-list-item>
  </m-list>
</template>

<style lang="less">
.list-div {
display: flex;
gap: 10px;
> * {
  flex: 1;
}
}
</style>
`;
export const mixCode = `<template>
  <div class="list-div">
    <m-list type="decimal">
      <m-list-item>腾讯</m-list-item>
      <m-list type="square">
        <m-list-item>腾讯云</m-list-item>
        <m-list-item>王者荣耀</m-list-item>
        <m-list-item>英雄联盟手游</m-list-item>
      </m-list>
      <m-list-item>阿里</m-list-item>
      <m-list type="square">
        <m-list-item>支付宝</m-list-item>
        <m-list-item>天猫</m-list-item>
        <m-list-item>淘宝</m-list-item>
      </m-list>
      <m-list-item>字节</m-list-item>
      <m-list type="square">
        <m-list-item>抖音</m-list-item>
        <m-list-item>皮皮虾</m-list-item>
        <m-list-item>西瓜视频</m-list-item>
      </m-list>
    </m-list>
    <m-list type="decimal">
      <m-list type="circle">
        <template #title> 腾讯 </template>
        <m-list-item>腾讯云</m-list-item>
        <m-list-item>王者荣耀</m-list-item>
        <m-list-item>英雄联盟手游</m-list-item>
      </m-list>
      <m-list type="circle">
        <template #title> 阿里 </template>
        <m-list-item>支付宝</m-list-item>
        <m-list-item>天猫</m-list-item>
        <m-list-item>淘宝</m-list-item>
      </m-list>
      <m-list type="circle">
        <template #title> 字节 </template>
        <m-list-item>抖音</m-list-item>
        <m-list-item>皮皮虾</m-list-item>
        <m-list-item>西瓜视频</m-list-item>
      </m-list>
    </m-list>
  </div>
</template>

<style lang="less">
.list-div {
display: flex;
gap: 10px;
> * {
  flex: 1;
}
}
</style>
`
