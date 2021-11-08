//主要配置
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ElementUI from "element-ui"
import animated from "animate.css"
import vueParticles from "vue-particles"
import "element-ui/lib/theme-chalk/index.css"

Vue.use(ElementUI)
Vue.use(animated)
Vue.use(vueParticles)

//全局组件
import czpTable from "@/components/czpTable/Index.vue"
import czpForm from "@/components/czpForm/Index.vue"
import czpCard from "@/components/czpCard/Index.vue"
Vue.use(function () {
  Vue.component("czpTable", czpTable)
  Vue.component("czpForm", czpForm)
  Vue.component("czpCard", czpCard)
})

//全局混入&过滤器&其他配置
import "@/utils/mixins"
import "@/utils/filters"
import "@/permission"

//相关配置
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
