import request from "@/utils/request"
import qs from "qs"

export const getStoresApi = (params) => {
  return request({
    url: "/stores/index.jsp",
    method: "get",
    params
  })
}
export const postStoresApi = (postData) => {
  return request({
    url: "/stores/create.jsp",
    method: "post",
    data: qs.stringify(postData)
  })
}
export const deleteStoresApi = (params) => {
  return request({
    url: "/stores/delete.jsp",
    method: "delete",
    params
  })
}
