import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "monkeys-ui/lib/assets/css/index.css"
import "./assets/index.css";

import { mButton } from "../lib/packages/button"

const app = createApp(App).use(router);
mButton.name = "mButton"
console.log(mButton.name);
app.component(mButton.name, mButton);
app.mount("#app");
