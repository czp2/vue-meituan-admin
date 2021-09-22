// 导入模块
const Mock = require("mockjs")
const { random } = require("../utils")

// 准备数据
let data = []
for (let i = 1; i <= 8; i++) {
  data.push(
    Mock.mock({
      id: "@id",
      role_name: ["超级管理员", "财务", "人事", "普通用户"][random(0, 3)],
      uname: "@ctitle(2,4)",
      mobile: "1@float(1000000000,9999999999,0,0)",
      state: [true, false][random(0, 1)],
      update_time: "@datetime"
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
