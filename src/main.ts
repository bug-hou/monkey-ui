import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "monkeys-ui/lib/assets/css/index.css"
import "./assets/index.css";

import { mButton, mButtonGroup } from "../lib/packages/button"

const app = createApp(App).use(router);
console.log(mButtonGroup.name)
app.component(mButton.name, mButton);
app.component(mButtonGroup.name, mButtonGroup);
app.mount("#app");
