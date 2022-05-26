import { App } from "vue";
import {
  mButton, mButtonGroup, mIcon, mIconGroup,
  mInput, mAvatar, mGradient, mBackTop, mCard, mDivider,
  mCollapse, mCollapseItem, mInputNumber, mCheckBox, mCheckBoxGroup,
  mRadio, mRadioGroup, mSelect, mSwitch, mPagination, mTag, mTagInput
} from "../../lib";

const cpns = [mAvatar, mButton, mButtonGroup, mIcon, mIconGroup, mInput, mAvatar, mGradient, mBackTop, mCard, mDivider, mCollapse, mCollapseItem, mInputNumber, mCheckBox, mCheckBoxGroup, mRadio, mRadioGroup, mSelect, mSwitch, mPagination, mTag, mTagInput]

export function register(app: App) {
  cpns.forEach(item => {
    app.use(item)
  })
}
