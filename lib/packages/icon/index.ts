import Icon from "./src/icon.vue";

import { withInstall } from "../../utils/index"

Icon.name = "mIcon";
const mIcon = withInstall(Icon)

export {
  mIcon
}
