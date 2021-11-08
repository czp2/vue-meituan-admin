import request from "@/utils/request"
import qs from "qs"

export const getOrdersApi = (params) => {
  return request({
    url: "/orders/index.jsp",
    method: "get",
    params
  })
}
export const getOrdersTotalApi = (params) => {
  return request({
    url: "/orders/total.jsp",
    method: "get",
    params
  })
}
export const postOrdersApi = (postData) => {
  return request({
    url: "/orders/create.jsp",
    method: "post",
    data: qs.stringify(postData)
  })
}
export const deleteOrdersApi = (params) => {
  return request({
    url: "/orders/delete.jsp",
    method: "delete",
    params
  })
}
