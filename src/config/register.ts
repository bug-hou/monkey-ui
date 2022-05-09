import { App } from "vue";
import { mButton, mButtonGroup, mIcon, mIconGroup, mInput, mAvatar, mGradient } from "../../lib";

const cpns = [mAvatar, mButton, mButtonGroup, mIcon, mIconGroup, mInput, mAvatar, mGradient]

export function register(app: App) {
  cpns.forEach(item => {
    app.use(item)
  })
}
