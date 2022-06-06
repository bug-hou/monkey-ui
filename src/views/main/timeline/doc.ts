export const baseCode = `<template>
<cpn-play-vue title="defalut" description="使用默认属性" :code="baseCode">
  <m-timeline>
    <!-- <template #title>mUI组件事件线</template> -->
    <m-timeline-item
      timestamp="2022/6/6 15:04:55"
      type="default"
      title="默认"
    >
      我是默认
    </m-timeline-item>
    <m-timeline-item
      timestamp="2022/6/6 15:04:55"
      type="info"
      lineStyle="dashed"
      title="信息"
    >
      我是信息
    </m-timeline-item>
    <m-timeline-item
      timestamp="2022/6/6 15:04:55"
      type="warning"
      title="警告"
    >
      我是警告
    </m-timeline-item>
    <m-timeline-item
      timestamp="2022/6/6 15:04:55"
      type="success"
      title="成功"
    >
      我是成功
    </m-timeline-item>
    <m-timeline-item
      type="primary"
      timestamp="2022/6/6 15:04:55"
      title="原色"
    >
      我是原色
    </m-timeline-item>
  </m-timeline>
</cpn-play-vue>
</template>
`

export const horizontalCode = `<template>
<cpn-play-vue
  title="horizontal"
  description="horizontal属性为true时就会横轴排列"
  :code="baseCode"
>
  <m-timeline horizontal width="100%">
    <m-timeline-item
      timestamp="2022/6/6 15:04:55"
      type="default"
      title="默认"
    >
      我是默认
    </m-timeline-item>
    <m-timeline-item
      timestamp="2022/6/6 15:04:55"
      type="info"
      lineStyle="dashed"
      title="信息"
    >
      我是信息
    </m-timeline-item>
    <m-timeline-item
      timestamp="2022/6/6 15:04:55"
      type="warning"
      title="警告"
    >
      我是警告
    </m-timeline-item>
    <m-timeline-item
      timestamp="2022/6/6 15:04:55"
      type="success"
      title="成功"
    >
      我是成功
    </m-timeline-item>
    <m-timeline-item
      type="primary"
      timestamp="2022/6/6 15:04:55"
      title="原色"
    >
      我是原色
    </m-timeline-item>
  </m-timeline>
</cpn-play-vue>
</template>
`
export const iconCode = `<template>
<cpn-play-vue
  title="icon"
  description="使用icon插槽代替圆圈"
  :code="baseCode"
>
  <m-timeline>
    <m-timeline-item
      timestamp="2022/6/6 15:04:55"
      type="default"
      title="默认"
    >
      <template #icon>
        <m-icon name="m-star"></m-icon>
      </template>
      我是默认
    </m-timeline-item>
    <m-timeline-item
      timestamp="2022/6/6 15:04:55"
      type="info"
      lineStyle="dashed"
      title="信息"
    >
      <template #icon>
        <m-icon name="m-star"></m-icon>
      </template>
      我是信息
    </m-timeline-item>
    <m-timeline-item
      timestamp="2022/6/6 15:04:55"
      type="warning"
      title="警告"
    >
      <template #icon>
        <m-icon name="m-star"></m-icon>
      </template>
      我是警告
    </m-timeline-item>
    <m-timeline-item
      timestamp="2022/6/6 15:04:55"
      type="success"
      title="成功"
    >
      <template #icon>
        <m-icon name="m-star"></m-icon>
      </template>
      我是成功
    </m-timeline-item>
    <m-timeline-item
      type="primary"
      timestamp="2022/6/6 15:04:55"
      title="原色"
    >
      <template #icon>
        <m-icon name="m-star"></m-icon>
      </template>
      我是原色
    </m-timeline-item>
  </m-timeline>
</cpn-play-vue>
</template>
`
export const isBorderCode = `<template>
<cpn-play-vue
  title="isBorder"
  description="isBorder属性为true就会出现边框"
  :code="baseCode"
>
  <m-timeline horizontal width="100%" isBorder>
    <m-timeline-item
      timestamp="2022/6/6 15:04:55"
      type="default"
      title="默认"
    >
      我是默认
    </m-timeline-item>
    <m-timeline-item
      timestamp="2022/6/6 15:04:55"
      type="info"
      lineStyle="dashed"
      title="信息"
    >
      我是信息
    </m-timeline-item>
    <m-timeline-item
      timestamp="2022/6/6 15:04:55"
      type="warning"
      title="警告"
    >
      我是警告
    </m-timeline-item>
    <m-timeline-item
      timestamp="2022/6/6 15:04:55"
      type="success"
      title="成功"
    >
      我是成功
    </m-timeline-item>
    <m-timeline-item
      type="primary"
      timestamp="2022/6/6 15:04:55"
      title="原色"
    >
      我是原色
    </m-timeline-item>
  </m-timeline>
</cpn-play-vue>
</template>
`
