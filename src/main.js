//主要配置
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

//全局组件
import czpTable from "@/components/czpTable/Index.vue"
import czpForm from "@/components/czpForm/Index.vue"
import czpCard from "@/components/czpCard/Index.vue"
Vue.use(function () {
  Vue.component("czpTable", czpTable)
  Vue.component("czpForm", czpForm)
  Vue.component("czpCard", czpCard)
})

//全局混入&过滤器
import "@/utils/mixins"
import "@/utils/filters"

//相关配置
Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
