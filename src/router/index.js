import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

import Index from "../layout/Index.vue"

// import Welcome from "../views/Welcome.vue"
// import Test from "../views/Test.vue"
// //用户功能
// import UsersHistory from "../views/users/History.vue"
// import UsersList from "../views/users/Index.vue"
// import UsersCreate from "../views/users/Create.vue"
// //角色功能
// import RolesList from "../views/roles/Index.vue"
// import RolesCreate from "../views/roles/Create.vue"
// //权限功能
// import AuthsList from "../views/auths/Index.vue"
// import AuthsCreate from "../views/auths/Create.vue"
// //分类功能
// import CatesList from "../views/cates/Index.vue"
// import CatesCreate from "../views/cates/Create.vue"
// //门店功能
// import StoresList from "../views/stores/Index.vue"
// import StoresCreate from "../views/stores/Create.vue"
// //商品功能
// import GoodsList from "../views/goods/Index.vue"
// import GoodsCreate from "../views/goods/Create.vue"
// //订单功能
// import OrdersList from "../views/orders/Index.vue"
// import OrdersTotal from "../views/orders/Total.vue"
//登录功能
import Login from "../views/login/Index.vue"
import LoginSms from "../views/login/LoginSms.vue"
import LoginToken from "../views/login/LoginToken.vue"

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err)
// }

const routes = [
  {
    path: "/",
    name: "admin",
    component: Index,
    children: [
      // {
      //   path: "/welcome",
      //   component: Welcome,
      //   meta: { name1: "后台首页", name2: "欢迎页" }
      // },
      // { path: "/test", component: Test },
      // {
      //   path: "/users/history",
      //   component: UsersHistory,
      //   meta: { name1: "后台首页", name2: "访问历史" }
      // },
      // //用户
      // { path: "/users/list", alias: "/users", component: UsersList },
      // { path: "/users/create", component: UsersCreate },
      // //角色
      // { path: "/roles/list", alias: "/roles", component: RolesList },
      // { path: "/roles/create", component: RolesCreate },
      // //权限
      // { path: "/auths/list", alias: "/auths", component: AuthsList },
      // { path: "/auths/create", component: AuthsCreate },
      // //分类
      // { path: "/cates/list", alias: "/cates", component: CatesList },
      // { path: "/cates/create", component: CatesCreate },
      // //门店
      // { path: "/stores/list", alias: "/stores", component: StoresList },
      // { path: "/stores/create", component: StoresCreate },
      // //商品
      // { path: "/goods/list", alias: "/goods", component: GoodsList },
      // { path: "/goods/create", component: GoodsCreate },
      // //订单
      // { path: "/orders/list", alias: "/orders", component: OrdersList },
      // { path: "/orders/total", component: OrdersTotal }
    ]
  },
  //登录
  { path: "/login", component: Login },
  { path: "/login/sms", component: LoginSms },
  { path: "/login/token", component: LoginToken }
]

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
})

export default router
