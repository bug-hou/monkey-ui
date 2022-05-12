import Collapse from "./src/collapse.vue";
import CollapseItem from "./src/collapseItem.vue";
import { withInstall } from "../../utils";

const mCollapse = withInstall(Collapse, "mCollapse");
const mCollapseItem = withInstall(CollapseItem, "mCollapseItem")

export { mCollapse, mCollapseItem };
