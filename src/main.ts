import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "../lib/assets/css/index.css"
import "./assets/index.css";
//导入代码高亮文件
import hljs from 'highlight.js'
//导入代码高亮样式
import 'highlight.js/styles/base16/atelier-cave.css' // 导入代码高亮样式

import { mButton, mButtonGroup, mIcon, mIconGroup } from "../lib"

const app = createApp(App).use(router).use(mIcon).use(mIconGroup);
app.directive("highlight", (el: HTMLElement, binding) => {
  const { value } = binding;
  const html = hljs.highlight(value, { language: 'xml' }).value;
  el.innerHTML = html;
})
app.component(mButton.name, mButton);
app.component(mButtonGroup.name, mButtonGroup);
app.mount("#app");
