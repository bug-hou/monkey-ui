import mButton from "./src/button.vue";
import mButtonGroup from "./src/buttonGroup.vue";
import { withInstall } from "../../utils/withInstall"

mButton.name = "mButton";
mButtonGroup.name = "mButtonGroup";

withInstall(mButton)
withInstall(mButtonGroup)

export {
  mButton,
  mButtonGroup
}
