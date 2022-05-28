export const arrowCode = `<template>
  <m-tooltip tooltipText="没有箭头" :arrow="false">
    <m-button>取消箭头</m-button>
  </m-tooltip>
  <span></span>
  <m-tooltip tooltipText="dark没有箭头" effect="没有箭头" :arrow="false">
    <m-button>取消箭头</m-button>
  </m-tooltip>
</template>

<style lang="less" scoped>
span {
width: 20px;
display: inline-block;
}
</style>`;

export const delayCode = `<template>
  <m-tooltip tooltipText="我有延迟效果，延迟500毫秒" :delay="500">
    <m-button>延迟 500ms</m-button>
  </m-tooltip>
  <span></span>
  <m-tooltip tooltipText="离开后持续500毫秒" effect="dark" :duration="500">
    <m-button>持续 500ms</m-button>
  </m-tooltip>
  <span></span>
  <m-tooltip
    tooltipText="延迟500毫秒，离开后持续500毫秒"
    effect="dark"
    :duration="500"
    :delay="500"
  >
    <m-button>延迟 500ms 持续 500ms</m-button>
  </m-tooltip>
</template>

<style lang="less" scoped>
span {
width: 20px;
display: inline-block;
}
</style>
`

export const directionCode = `<template>
  <m-tooltip tooltipText="我在左边" direction="left">
    <m-button>左边</m-button>
  </m-tooltip>
  <span></span>
  <m-tooltip tooltipText="我在上边" effect="dark" direction="top">
    <m-button>上边</m-button>
  </m-tooltip>
  <span></span>
  <m-tooltip tooltipText="我在下边" effect="dark" direction="bottom">
    <m-button>下边</m-button>
  </m-tooltip>
  <span></span>
  <m-tooltip tooltipText="我在右边" effect="dark" direction="right">
    <m-button>右边</m-button>
  </m-tooltip>
</template>

<style lang="less" scoped>
span {
width: 20px;
display: inline-block;
}
</style>
`

export const effectCode = `<template>
  <m-tooltip tooltipText="我是light主题">
    <m-button>主题较亮</m-button>
  </m-tooltip>
  <span></span>
  <m-tooltip tooltipText="我是dark主题" effect="dark">
    <m-button>主题较暗</m-button>
  </m-tooltip>
</template>

<style lang="less" scoped>
span {
width: 20px;
display: inline-block;
}
</style>
`

export const headerCode = `<template>
  <m-tooltip tooltipText="我只不过是站在父母的肩上看风景" header="励志">
    <m-button>header默认</m-button>
  </m-tooltip>
  <span></span>
  <m-tooltip tooltipText="我一定要带着我的父母一起在肩上看风景" effect="dark">
    <m-button>自定义header</m-button>
    <template #header>
      <p style="color: #ccc">励志</p>
    </template>
  </m-tooltip>
</template>

<style lang="less" scoped>
span {
width: 20px;
display: inline-block;
}
</style>
`

export const listCode = `<template>
  <m-tooltip :tooltipText="list" :columns="3">
    <m-button>tooltipText为一个数组</m-button>
  </m-tooltip>
  <span></span>
  <m-tooltip :tooltipText="list" :columns="2">
    <m-button>tooltipText为一个数组</m-button>
  </m-tooltip>
</template>

<script lang="ts" setup>
  const list = ["http", "icmp", "dhcp", "ftp", "smtp", "dns", "udp"];
</script>
<style lang="less" scoped>
span {
width: 20px;
display: inline-block;
}
</style>
`

export const scrollCode = `<template>
  <m-tooltip
    tooltipText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod blanditiis fuga
hic odit numquam praesentium consequuntur. Cupiditate iure in molestiae quod
atque harum veritatis voluptatum asperiores nulla totam sunt, iusto modi
dolorum eveniet quasi? Ipsam, neque labore. Aliquam eum consequatur doloremque
nisi, possimus nobis, ipsum quisquam earum accusantium hic eius quia. Aliquam
mollitia blanditiis adipisci, porro impedit facere dolorem tempore? Unde harum
incidunt, pariatur nobis laborum, quas esse voluptates, sit quo totam natus
illo nesciunt amet accusantium sed saepe iure similique culpa enim magni
adipisci animi dignissimos? Adipisci et eius deleniti, soluta veniam omnis
nesciunt! Architecto at corporis voluptas doloremque?"
    width="200px"
    height="300px"
  >
    <m-button>tooltipText为一个数组</m-button>
  </m-tooltip>
  <span></span>
  <m-tooltip
    tooltipText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod blanditiis fuga
hic odit numquam praesentium consequuntur. Cupiditate iure in molestiae quod
atque harum veritatis voluptatum asperiores nulla totam sunt, iusto modi
dolorum eveniet quasi? Ipsam, neque labore. Aliquam eum consequatur doloremque
nisi, possimus nobis, ipsum quisquam earum accusantium hic eius quia. Aliquam
mollitia blanditiis adipisci, porro impedit facere dolorem tempore? Unde harum
incidunt, pariatur nobis laborum, quas esse voluptates, sit quo totam natus
illo nesciunt amet accusantium sed saepe iure similique culpa enim magni
adipisci animi dignissimos? Adipisci et eius deleniti, soluta veniam omnis
nesciunt! Architecto at corporis voluptas doloremque?"
    width="200px"
    height="300px"
  >
    <m-button>tooltipText为一个数组</m-button>
  </m-tooltip>
</template>

<style lang="less" scoped>
span {
width: 20px;
display: inline-block;
}
</style>
`;

export const triggerCode = `<template>
  <m-tooltip tooltipText="我只不过是站在父母的肩上看风景">
    <m-button>悬停</m-button>
  </m-tooltip>
  <span></span>
  <m-tooltip
    tooltipText="我一定要带着我的父母一起在肩上看风景"
    :keepAliveOnHover="false"
    effect="dark"
  >
    <m-button>悬停(提示无效)</m-button>
  </m-tooltip>
  <span></span>
  <m-tooltip tooltipText="加油，不负韶华" trigger="click">
    <m-button>点击</m-button>
  </m-tooltip>
</template>

<style lang="less" scoped>
span {
width: 20px;
display: inline-block;
}
</style>
`
