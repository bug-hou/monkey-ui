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

import { mTimeline, mTimelineItem } from "./packages/timeline";

import { mResult } from "./packages/result";

import { mAffix } from "./packages/affix";

import { mCascader } from "./packages/cascader";

import { mAutoComplete } from "./packages/autoComplete";


import { mVertualScroll } from "./packages/vertual-scroll";

import { mTransfer } from "./packages/transfer";

import { mColorPicker } from "./packages/color-picker";

import { mDropdown } from "./packages/dropdown";

import { mTree } from "./packages/tree";

import { mCarousel, mCarouselItem } from "./packages/carousel";

import { mMenu, mMenuItem } from "./packages/menu";

import { mAlert } from "./packages/alert";

import { mList, mListItem } from "./packages/list";

import { mWatermark } from "./packages/watermark";

import { mTab, mTabPane } from "./packages/tab";

import { mForm, mFormItem } from "./packages/form";

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
  mTimelineItem,
  mResult,
  mAffix,
  mCascader,
  mAutoComplete,
  mVertualScroll,
  mTransfer,
  mColorPicker,
  mDropdown,
  mTree,
  mCarousel,
  mCarouselItem,
  mMenu,
  mMenuItem,
  mAlert,
  mList,
  mListItem,
  mWatermark,
  mTab,
  mTabPane,
  mForm,
  mFormItem
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
  mTimelineItem,
  mResult,
  mAffix,
  mCascader,
  mAutoComplete,
  mVertualScroll,
  mTransfer,
  mColorPicker,
  mDropdown,
  mTree,
  mCarousel,
  mCarouselItem,
  mMenu,
  mMenuItem,
  mAlert,
  mList,
  mListItem,
  mWatermark,
  mTab,
  mTabPane,
  mForm,
  mFormItem
}
