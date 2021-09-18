import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../layout/Index.vue"),
    children: [
      {
        path: "welcome",
        alias: "/",
        component: () => import("../views/Welcome.vue"),
      },
      {
        path: "/users/history",
        component: () => import("../views/users/History.vue"),
      },
      {
        path: "/users/list",
        alias: "/users",
        component: () => import("../views/users/Index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
