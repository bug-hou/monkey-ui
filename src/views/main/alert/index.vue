<template>
  <div class="avatar">
    <cpn-header-vue
      title="autoComplete"
      name="自动填充"
      description="可以尽量让你少些一点字"
    >
    </cpn-header-vue>

    <div class="layout">
      <m-alert> 重要声明 </m-alert>
      <br />
      <div></div>
      <br />
      <m-alert extend type="primary">
        <template #title> 这是一个警告 </template>
        <template #extend>
          <p>
            让企业普惠上云，云服务器最低至2.5折，还有更多产品更低折扣满足您的需求
          </p>
          <p>更多提示语 More</p>
        </template>
        <p>本功能将在 2019 年 2 月 29 日下线，请注意做好下列迁移工作：</p>
        <p>小程序云服务器有奖内测中，即刻成为产品体验官</p>
        <p>云服务器限时秒杀，首购1C1G仅需99元/年，还有多款配置供您选择</p>
        <p>
          让企业普惠上云，云服务器最低至2.5折，还有更多产品更低折扣满足您的需求
        </p>
      </m-alert>
    </div>
  </div>
</template>

<script lang="ts" setup name="avatar">
/*
 * @Author: bughou
 * @Date: 2022-05-09 15:38:44
 * @Description: 创建一个avatar组件
 */
// 从下载的组件中导入函数
import cpnHeaderVue from "../../../components/cpnHeader/cpnHeader.vue";
</script>
