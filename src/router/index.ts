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
      }, {
        path: "backTop",
        component: () => import("../views/main/backTop/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "card",
        component: () => import("../views/main/card/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "divider",
        component: () => import("../views/main/divider/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "collapse",
        component: () => import("../views/main/collapse/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "inputNumber",
        component: () => import("../views/main/inputNumber/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "checkBox",
        component: () => import("../views/main/checkBox/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "radio",
        component: () => import("../views/main/radio/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "select",
        component: () => import("../views/main/select/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "switch",
        component: () => import("../views/main/switch/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "pagination",
        component: () => import("../views/main/pagination/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "tag",
        component: () => import("../views/main/tag/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "tooltip",
        component: () => import("../views/main/tooltip/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "ellipsis",
        component: () => import("../views/main/ellipsis/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "numberAnimation",
        component: () => import("../views/main/numberAnimation/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "badge",
        component: () => import("../views/main/badge/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "rate",
        component: () => import("../views/main/rate/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "timeline",
        component: () => import("../views/main/timeline/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "result",
        component: () => import("../views/main/result/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "affix",
        component: () => import("../views/main/affix/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "cascader",
        component: () => import("../views/main/cascader/index.vue"),
        meta: {
          aside: [{
            href: "#",
            name: "中年"
          }]
        }
      }, {
        path: "autoComplete",
        component: () => import("../views/main/autoComplete/index.vue"),
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
