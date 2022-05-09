import avatar from "./src/avatar.vue";
import { withInstall } from "../../utils/withInstall"

avatar.name = "mAvatar";

const mAvatar = withInstall(avatar);

export {
  mAvatar,
}
