import Radio from "./src/radio.vue";
import RadioGroup from "./src/radioGroup.vue";
import { withInstall } from "../../utils"

const mRadio = withInstall(Radio, "mRadio")
const mRadioGroup = withInstall(RadioGroup, "mRadioGroup")

export {
  mRadio,
  mRadioGroup
}
