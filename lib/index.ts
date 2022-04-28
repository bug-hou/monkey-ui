import { App } from "vue"

import { mButton, mButtonGroup } from "./packages/button";

const components = [mButton, mButtonGroup]

components.forEach(item => {
  item.install = (app: App) => {
    app.component(item.name, item)
  }
})

export {
  mButton,
  mButtonGroup
}
