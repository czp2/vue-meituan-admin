import store from "@/store"
import router from "./router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const whitePage = ["/login", "/login/sms", "/login/token", "/404"]
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (whitePage.indexOf(to.path) != -1) next()
  else {
    let token = store.state.login.token
    if (token) {
      // console.log(store.state.auth.menu)
      if (store.state.auth.menu.length <= 0) {
        store.dispatch("auth/FETCH_MENU")
        // console.log("111")
      }
      next()
    } else {
      next({ path: "/login" })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
