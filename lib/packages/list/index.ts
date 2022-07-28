import List from "./src/list.vue";
import ListItem from "./src/list-item.vue";
import { withInstall } from "../../utils"

const mList = withInstall(List, "mList");
const mListItem = withInstall(ListItem, "mListItem");

export {
  mList,
  mListItem
}
