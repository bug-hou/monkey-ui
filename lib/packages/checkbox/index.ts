import CheckBox from "./src/checkBox.vue";
import CheckBoxGroup from "./src/checkBoxGroup.vue";
import { withInstall } from "../../utils";

const mCheckBox = withInstall(CheckBox, "mCheckBox");

const mCheckBoxGroup = withInstall(CheckBoxGroup, "mCheckBoxGroup");


export { mCheckBox, mCheckBoxGroup };
