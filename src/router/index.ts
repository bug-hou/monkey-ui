import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import index from "../views/index/index.vue"

const routers: RouteRecordRaw[] = [
  {
    redirect: "/index",
    path: ""
  },
  {
    path: "/index",
    name: "index",
    component: index
  },
  {
    path: "/component",
    name: "component",
    component: () => import("../views/main/main.vue"),
    children: [
      {
        redirect: "/component/button",
        path: ""
      },
      {
        path: "button",
        component: () => import("../views/main/button/index.vue"),
        meta: {
          asides: [
            {
              name: "size大小",
              href: "#size"
            },
            {
              name: "type类型",
              href: "#type"
            }, {
              name: "shape形状",
              href: "#shape"
            }, {
              name: "plain朴素",
              href: "#plain"
            }, {
              name: "disabled禁用",
              href: "#disabled"
            }, {
              name: "icon图标",
              href: "#icon"
            }, {
              name: "loading加载",
              href: "#loading"
            }, {
              name: "slot插槽",
              href: "#slot"
            }
          ]
        }
      }, {
        path: "icon",
        component: () => import("../views/main/icon/index.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers
});

export default router;
