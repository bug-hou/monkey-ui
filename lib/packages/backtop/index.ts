import backTop from "./src/backtop.vue";
import { withInstall } from "../../utils"

backTop.name = "mBackTop";

const mBackTop = withInstall(backTop);

export {
  mBackTop
}
