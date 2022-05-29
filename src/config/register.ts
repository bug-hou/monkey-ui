import { App } from "vue";
// import {
//   mButton, mButtonGroup, mIcon, mIconGroup,
//   mInput, mAvatar, mGradient, mBackTop, mCard, mDivider,
//   mCollapse, mCollapseItem, mInputNumber, mCheckBox, mCheckBoxGroup,
//   mRadio, mRadioGroup, mSelect, mSwitch, mPagination, mTag, mTooltip,
//   mEllipsis
// } from "../../lib";

import monkeysUI from "../../lib"

// const cpns = [mAvatar, mButton, mButtonGroup, mIcon, mIconGroup, mInput, mAvatar, mGradient, mBackTop, mCard, mDivider, mCollapse, mCollapseItem, mInputNumber, mCheckBox, mCheckBoxGroup, mRadio, mRadioGroup, mSelect, mSwitch, mPagination, mTag, mTooltip, mEllipsis]

export function register(app: App) {
  // cpns.forEach(item => {
  //   app.use(item)
  // })

  app.use(monkeysUI)
}
