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
    component: () => import("../views/main/main.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers
});

export default router;
