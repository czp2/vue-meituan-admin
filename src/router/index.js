import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

import Index from "../layout/Index.vue"
import Welcome from "../views/Welcome.vue"
import Test from "../views/Test.vue"

import UsersHistory from "../views/users/History.vue"
import UsersList from "../views/users/Index.vue"
import UsersCreate from "../views/users/Create.vue"

import CatesList from "../views/cates/Index.vue"
import StoresList from "../views/stores/Index.vue"
import StoresCreate from "../views/stores/Create.vue"

import GoodsList from "../views/goods/Index.vue"
import GoodsCreate from "../views/goods/Create.vue"

import OrdersList from "../views/orders/Index.vue"

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    children: [
      { path: "welcome", alias: "/", component: Welcome },
      { path: "test", alias: "/test", component: Test },

      { path: "/users/history", component: UsersHistory },
      { path: "/users/list", alias: "/users", component: UsersList },
      { path: "/users/create", component: UsersCreate },

      { path: "/cates/list", alias: "/cates", component: CatesList },

      { path: "/stores/list", alias: "/stores", component: StoresList },
      { path: "/stores/create", component: StoresCreate },

      { path: "/goods/list", alias: "/goods", component: GoodsList },
      { path: "/goods/create", component: GoodsCreate },

      { path: "/orders/list", alias: "/orders", component: OrdersList }
    ]
  }
]

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
})

export default router
