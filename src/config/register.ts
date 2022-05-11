import { App } from "vue";
import { mButton, mButtonGroup, mIcon, mIconGroup, mInput, mAvatar, mGradient, mBackTop, mCard, mDivider } from "../../lib";

const cpns = [mAvatar, mButton, mButtonGroup, mIcon, mIconGroup, mInput, mAvatar, mGradient, mBackTop, mCard, mDivider]

export function register(app: App) {
  cpns.forEach(item => {
    app.use(item)
  })
}
