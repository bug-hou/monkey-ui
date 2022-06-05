import { mButton, mButtonGroup } from "./packages/button";

import { mIcon, mIconGroup } from "./packages/icon";

import { mInput, mInputGroup } from "./packages/input"

import { mAvatar } from "./packages/avatar";

import { mGradient } from "./packages/gradient"

import { mBackTop } from "./packages/backtop";

import { mCard } from "./packages/card";

import { mDivider } from "./packages/divider";

import { mCollapse, mCollapseItem } from "./packages/collapse";

import { mInputNumber } from "./packages/inputNumber";

import { mRadio, mRadioGroup } from "./packages/radio";

import { mCheckBox, mCheckBoxGroup } from "./packages/checkbox";

import { mSelect } from "./packages/select";

import { mSwitch } from "./packages/switch";

import { mPagination } from "./packages/pagination";

import { mTag } from "./packages/tag";

import { mTooltip } from "./packages/tooltip";

import { mEllipsis } from "./packages/ellipsis";

import { mNumberAnimation } from "./packages/numberAnimation";
import { mBadge } from "./packages/badge"

import { mRate } from "./packages/rate";

import { mTimeline, mTimelineItem } from "./packages/timeline"

import { App } from "vue";

const monkeysUI = [
  mButton,
  mButtonGroup,
  mIcon,
  mIconGroup,
  mInput,
  mInputGroup,
  mAvatar,
  mGradient,
  mBackTop,
  mCard,
  mDivider,
  mCollapse,
  mCollapseItem,
  mInputNumber,
  mCheckBox,
  mCheckBoxGroup,
  mRadio,
  mRadioGroup,
  mSelect,
  mSwitch,
  mPagination,
  mTag,
  mTooltip,
  mEllipsis,
  mNumberAnimation,
  mBadge,
  mRate,
  mTimeline,
  mTimelineItem
]

export default (app: App, opt?: any) => {
  monkeysUI.forEach(cpn => {
    app.use(cpn)
  })
}

export {
  mButton,
  mButtonGroup,
  mIcon,
  mIconGroup,
  mInput,
  mInputGroup,
  mAvatar,
  mGradient,
  mBackTop,
  mCard,
  mDivider,
  mCollapse,
  mCollapseItem,
  mInputNumber,
  mCheckBox,
  mCheckBoxGroup,
  mRadio,
  mRadioGroup,
  mSelect,
  mSwitch,
  mPagination,
  mTag,
  mTooltip,
  mEllipsis,
  mNumberAnimation,
  mBadge,
  mRate,
  mTimeline,
  mTimelineItem
}
