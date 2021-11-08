//导入request.js
import request from "@/utils/request"
import qs from "qs"
//导出方法

//获取用户列表
export const getUsersApi = (params) => {
  return request({
    url: "/users/index.jsp",
    method: "get",
    params
  })
}

//获取访客记录
export const getUsersHistoryApi = (params) => {
  return request({
    url: "/users/history.jsp",
    method: "get",
    params
  })
}

//创建用户
export const postUsersApi = (postData) => {
  return request({
    url: "/users/create.jsp",
    method: "post",
    data: qs.stringify(postData)
  })
}

//修改用户
export const putUsersApi = (postData) => {
  return request({
    url: "/users/update.jsp",
    method: "put",
    data: qs.stringify(postData)
  })
}

//修改用户状态
export const putUsersStateApi = (postData) => {
  return request({
    url: "/users/state.jsp",
    method: "put",
    data: qs.stringify(postData)
  })
}

//分配角色
export const putUsersAssignApi = (postData) => {
  return request({
    url: "/users/assign.jsp",
    method: "put",
    data: qs.stringify(postData)
  })
}

//删除用户
export const deleteUsersApi = (params) => {
  return request({
    url: "/users/delete.jsp",
    method: "delete",
    params
  })
}

//登录
export const postUsersLoginApi = (postData) => {
  return request({
    url: "/users/login.jsp",
    method: "post",
    data: qs.stringify(postData)
  })
}
