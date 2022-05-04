import Icon from "./src/icon.vue";
import IconGroup from "./src/IconGroup.vue";

import { withInstall } from "../../utils/index"

Icon.name = "mIcon";
IconGroup.name = "mIconGroup";
const mIcon = withInstall(Icon)
const mIconGroup = withInstall(IconGroup)

export {
  mIcon,
  mIconGroup
}
