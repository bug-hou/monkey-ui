import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routers: RouteRecordRaw[] = [
  {
    redirect: "/index",
    path: ""
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../views/index/index.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers
});

export default router;
