//导入axios
import axios from "axios"
import router from "@/router"
import { Loading, Message } from "element-ui"
//创建axios实例
//TODO.待优化
const request = axios.create({
  baseURL: process.env.VUE_APP_URL,
  headers: {
    "content-type": "application/x-www-form-urlencoded"
  },
  timeout: 8000
})
//为request设置拦截器
//请求拦截器
let loadingInstance = 0
let ajax = {}
request.interceptors.request.use(
  (config) => {
    let token =
      localStorage.getItem("token") || "9201591ba0eb36c8abaea2854274f5082"
    config.headers.token = token

    // 前端中断请求（好处：1-避免网络延迟出现数据覆盖，2-出现重复请求尽快释放前端资源
    if (ajax[config.url]) {
      ajax[config.url].cancel("Operation canceled by the user.")
      delete ajax[config.url]
    }
    ajax[config.url] = axios.CancelToken.source()
    config.cancelToken = ajax[config.url].token

    // 开启loading
    loadingInstance = Loading.service({ fullscreen: true })
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
//响应拦截器
request.interceptors.response.use(
  (response) => {
    // 关闭loading
    if (loadingInstance) loadingInstance.close()

    // 权限判断（咱们这个项目几乎无概率
    if (response.data.meta.state == 403) {
      Message.error("无权访问，跳转中...")
      router.push("/login")
      return
    }

    // TOKEN过期
    if (
      response.data.meta.state == 400 &&
      response.data.meta.msg.includes("TOKEN过期")
    ) {
      Message.error("TOKEN过期，请重新登录...")
      router.push("/login")
      return
    }

    return response.data
  },
  (error) => {
    // 失败响应
    let errorObj = JSON.parse(JSON.stringify(error))

    // 关闭loading
    if (loadingInstance) loadingInstance.close()

    // 判断失败原因
    if (errorObj.message.includes("timeout")) {
      Message.error("请求超时，请刷新后重试...")
    } else if (errorObj.message.includes("404")) {
      Message.error("请求失败，接口或文件不存在 404...")
    } else if (errorObj.message.includes("canceled")) {
      console.log("重复点击取消...", errorObj)
    } else {
      // 邮件报警
      // 错误原因   error.message
      // 错误数据   请求的接口地址、当前访问的路由 JSON.stringify(error)  数据编码方式等
      // 用户信息    h5
      // 浏览器信息  ua
      let email = "15021459079@163.com"
      let title = "千锋云直播B2C管理系统异常通知"
      let userinfo = `${localStorage.getItem("uname")}（${localStorage.getItem(
        "roleName"
      )}）`
      let ua = navigator.userAgent
      let message = error.message
      let errorinfo = JSON.stringify(error)
      fetch("http://kg.zhaodashen.cn/mt/admin/email.jsp", {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `email=${email}&title=${title}&userinfo=${userinfo}&ua=${ua}&message=${message}&errorinfo=${errorinfo}`
      }).then((res) => {
        console.log(res)
      })
    }
    return Promise.reject(error)
  }
)
//导出
export default request
