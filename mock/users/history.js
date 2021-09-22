// 导入模块
const Mock = require("mockjs")
const { random } = require("../utils")

// 准备数据
let data = []
for (let i = 1; i <= 8; i++) {
  data.push(
    Mock.mock({
      id: "@id",
      name: "@ctitle(2, 4)",
      label: ["密保", "短信", "扫码", "令牌"][random(0, 3)],
      address: "@province@city",
      login_time: "@datetime",
      last_login_time: "@datetime"
    })
  )
}

// 导出生成的测试数据即刻
export default Mock.mock({
  meta: {
    state: 200,
    msg: "操作成功"
  },
  data
})
