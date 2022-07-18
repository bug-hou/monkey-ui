import Menu from "./src/menu.vue";
import MenuItem from "./src/menu-item.vue";
import { withInstall } from "../../utils"

const mMenu = withInstall(Menu, "mMenu");

const mMenuItem = withInstall(MenuItem, "mMenuItem");

export {

}

export const a = 12;
