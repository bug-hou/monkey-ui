import Input from "./src/input.vue";
import InputGroup from "./src/inputGroup.vue";

import { withInstall } from "../../utils/index"

Input.name = "mInput";
InputGroup.name = "mInputGroup";
const mInput = withInstall(Input)
const mInputGroup = withInstall(InputGroup)

export {
  mInput,
  mInputGroup
}
