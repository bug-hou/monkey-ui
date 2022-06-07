export const cupCode = `<template>
<cpn-play-vue title="cry" description="component设置为cry时显示一个哭脸" :code="cupCode">
  <m-result
    title="别灰心下一次就能中了"
    content="再接再厉你可以成功的进大厂加油"
    component="cry"
  >
    <template #footer>
      <m-button>下一个</m-button>
    </template>
  </m-result>
</cpn-play-vue>
</template>
`

export const cryCode = `<template>
<cpn-play-vue title="cry" description="component设置为cry时显示一个哭脸" :code="cupCode">
  <m-result
    title="别灰心下一次就能中了"
    content="再接再厉你可以成功的进大厂加油"
    component="cry"
  >
    <template #footer>
      <m-button>下一个</m-button>
    </template>
  </m-result>
</cpn-play-vue>
</template>
`

export const ghostCode = `<template>
<cpn-play-vue title="ghost" description="component设置为ghost时显示一个鬼脸" :code="cupCode">
  <m-result
    title="剑圣"
    content="真正的大师永远怀着一颗学徒的心。你的剑就是我的剑！"
    component="ghost"
  >
    <template #footer>
      <m-button>下一个</m-button>
    </template>
  </m-result>
</cpn-play-vue>
</template>
`

export const imgCode = `<template>
<cpn-play-vue
  title="header"
  description="自定义header插件"
  :code="cupCode"
>
  <m-result
    title="403禁止访问"
    component="palm"
    content="你可能需要提升一下权限"
  >
    <template #header>
      <img
        src="https://game.gtimg.cn/images/lol/act/img/skinloading/157000.jpg"
        alt="亚索"
        style="height: 160px;width: 160px;"
      />
    </template>
    <template #footer>
      <m-button type="primary">提升权限</m-button>
    </template>
  </m-result>
</cpn-play-vue>
</template>
`

export const palmCode = `<template>
<cpn-play-vue
  title="palm"
  description="component设置为palm时显示一个手掌"
  :code="cupCode"
>
  <m-result
    title="403禁止访问"
    component="palm"
    content="你可能需要提升一下权限"
  >
    <template #footer>
      <m-button type="primary">提升权限</m-button>
    </template>
  </m-result>
</cpn-play-vue>
</template>
`

export const planetCode = `<template>
<cpn-play-vue title="planet" description="component设置为planet时显示一个行星" :code="cupCode">
  <m-result
    title="瑞文"
    content="断剑重铸之日，骑士归来之时"
    component="planet"
  >
    <template #footer>
      <m-button>下一个</m-button>
    </template>
  </m-result>
</cpn-play-vue>
</template>
`

export const prohibitCode = `<template>
<cpn-play-vue title="prohibit" description="component设置为prohibit时显示一个禁止" :code="cupCode">
  <m-result
    title="李青"
    content="双眼失明丝毫不影响我追捕敌人，因为我能闻到他们身上的臭味"
    component="prohibit"
  >
    <template #footer>
      <m-button>下一个</m-button>
    </template>
  </m-result>
</cpn-play-vue>
</template>
`

export const smallCode = `<template>
<cpn-play-vue title="small" description="component设置为small时显示一个笑脸" :code="cupCode">
  <m-result
    title="恭喜你答对了"
    content="我于杀戮之中绽放，亦如黎明中的花朵"
    component="small"
  >
    <template #footer>
      <m-button>下一个</m-button>
    </template>
  </m-result>
</cpn-play-vue>
</template>
`
