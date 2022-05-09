import { App } from "vue";
import { mButton, mButtonGroup, mIcon, mIconGroup, mInput, mAvatar } from "../../lib";

const cpns = [mAvatar, mButton, mButtonGroup, mIcon, mIconGroup, mInput, mAvatar]

export function register(app: App) {
  cpns.forEach(item => {
    app.use(item)
  })
}
