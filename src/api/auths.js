import request from "@/utils/request"
import qs from "qs"

export const getAuthsApi = (params) => {
  return request({
    url: "/auth/index.jsp",
    method: "get",
    params
  })
}

export const postAuthsApi = (postData) => {
  return request({
    url: "/auth/create.jsp",
    method: "post",
    data: qs.stringify(postData)
  })
}

export const putAuthsApi = (postData) => {
  return request({
    url: "/auth/update.jsp",
    method: "put",
    data: qs.stringify(postData)
  })
}

//删除
export const deleteAuthsApi = (params) => {
  return request({
    url: "/auth/delete.jsp",
    method: "delete",
    params
  })
}

export const getMenuApi = () => {
  return request({
    url: "/auth/menu.jsp",
    method: "get"
  })
}
