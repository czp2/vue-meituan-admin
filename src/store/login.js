import { postUsersLoginApi } from "@/api/users"
import { postSmsLoginApi } from "@/api/sms"
import { postTokenLoginApi } from "@/api/token"

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || "",
    uname: localStorage.getItem("uname") || "",
    roleName: localStorage.getItem("roleName") || ""
  },
  getters: {},
  mutations: {
    SET_USERINFO(state, payload) {
      state.token = payload.token
      state.uname = payload.uname
      state.roleName = payload.roleName
      localStorage.setItem("token", payload.token)
      localStorage.setItem("uname", payload.uname)
      localStorage.setItem("roleName", payload.roleName)
    },
    DELETE_USERINFO(state) {
      state.token = ""
      state.uname = ""
      state.roleName = ""
      localStorage.clear()
    }
  },
  actions: {
    async FETCH_MB_LOGIN(context, payload) {
      let res = await postUsersLoginApi(payload)
      if (res.meta.state == 200) {
        context.commit("SET_USERINFO", res.data)
      }
      return res
    },
    async FETCH_SMS_LOGIN(context, payload) {
      let res = await postSmsLoginApi(payload)
      if (res.meta.state == 200) {
        context.commit("SET_USERINFO", res.data)
      }
      return res
    },
    async FETCH_TOKEN_LOGIN(context, payload) {
      let res = await postTokenLoginApi(payload)
      if (res.meta.state == 200) {
        context.commit("SET_USERINFO", res.data)
      }
      return res
    }
  },
  modules: {}
}
