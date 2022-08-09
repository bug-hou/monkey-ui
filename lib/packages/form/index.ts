import Form from "./src/form.vue";
import FormItem from "./src/item.vue";

import { withInstall } from "../../utils";

const mForm = withInstall(Form, "mForm");
const mFormItem = withInstall(FormItem, "mFormItem");

export {
  mForm,
  mFormItem
}
