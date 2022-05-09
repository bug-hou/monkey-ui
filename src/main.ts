import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "../lib/assets/css/index.css"
import "./assets/index.css";
//导入代码高亮文件
import hljs from 'highlight.js'
//导入代码高亮样式
import 'highlight.js/styles/base16/atelier-cave.css' // 导入代码高亮样式
import { register } from "./config/register"


const app = createApp(App).use(router);
register(app);
app.directive("highlight", (el: HTMLElement, binding) => {
  const { value } = binding;
  const html = hljs.highlight(value, { language: 'xml' }).value;
  el.innerHTML = html;
})
app.mount("#app");
