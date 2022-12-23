import { RouteRecordRaw } from "vue-router"

/**
 * staticRouter(静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: { name: "home" },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/layouts/index.vue"),
    // component: () => import("@/layouts/indexAsync.vue"),
    redirect: { name: "home" },
    children: [],
  },
]

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/errorPage/404.vue"),
    meta: {
      title: "403页面",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "NotFound" },
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/views/errorPage/404.vue"),
    meta: {
      title: "404页面",
    },
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/errorPage/404.vue"),
    meta: {
      title: "500页面",
    },
  },
]
