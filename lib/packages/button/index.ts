import button from "./src/button.vue";
import buttonGroup from "./src/buttonGroup.vue";
import { withInstall } from "../../utils/withInstall"

button.name = "mButton";
buttonGroup.name = "mButtonGroup";

const mButton = withInstall(button);
const mButtonGroup = withInstall(buttonGroup);

export {
  mButton,
  mButtonGroup
}
