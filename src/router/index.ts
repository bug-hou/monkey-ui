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
            }, {
              name: "text文字",
              href: "#text"
            }
          ]
        }
      }, {
        path: "icon",
        component: () => import("../views/main/icon/index.vue")
      }, {
        path: "input",
        component: () => import("../views/main/input/index.vue"),
        meta: {
          aside: []
        }
      }, {
        path: "avatar",
        component: () => import("../views/main/avatar/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "gradient",
        component: () => import("../views/main/gradient/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers
});

export default router;
