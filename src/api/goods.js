import request from "@/utils/request"
import qs from "qs"

export const getGoodsApi = (params) => {
  return request({
    url: "/goods/index.jsp",
    method: "get",
    params
  })
}
export const postGoodsApi = (postData) => {
  return request({
    url: "/goods/create.jsp",
    method: "post",
    data: qs.stringify(postData)
  })
}
export const deleteGoodsApi = (params) => {
  return request({
    url: "/goods/delete.jsp",
    method: "delete",
    params
  })
}
