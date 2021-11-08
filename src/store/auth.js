import { getMenuApi } from "@/api/auths"
import router from "@/router"

export default {
  namespaced: true,
  state: {
    menu: []
  },
  getters: {},
  mutations: {
    SET_MENU(state, payload) {
      state.menu = payload
      //动态路由
      payload.forEach((oneMenu) => {
        if (oneMenu.children && oneMenu.children.length > 0) {
          oneMenu.children.forEach((twoMenu) => {
            router.addRoute("admin", {
              path: twoMenu.url,
              component: () => import("@/views/" + twoMenu.component),
              meta: {
                name1: twoMenu.auth_pname,
                name2: twoMenu.auth_name,
                keep_alive: twoMenu.keep_alive
              }
            })
            router.addRoute({
              path: "*",
              component: () => import("@/views/404.vue")
            })
          })
        }
      })
    },
    DELETE_MENU(state) {
      state.menu = []
    }
  },
  actions: {
    async FETCH_MENU(context, payload) {
      let res = await getMenuApi(payload)
      //   console.log(res)
      if (res.meta.state == 200) {
        // console.log(res.data)
        context.commit("SET_MENU", res.data)
      }
    }
  },
  modules: {}
}
