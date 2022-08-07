import Tab from "./src/tab.vue";
import TabPane from "./src/tabPane.vue";

import { withInstall } from "../../utils";

const mTab = withInstall(Tab, "mTab");
const mTabPane = withInstall(TabPane, "mTabPane");

export {
  mTab,
  mTabPane
}
