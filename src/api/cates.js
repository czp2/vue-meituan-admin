import request from "@/utils/request"
import qs from "qs"

export const getCatesApi = (params) => {
  return request({
    url: "/cate/index.jsp",
    method: "get",
    params
  })
}

export const postCatesApi = (postData) => {
  return request({
    url: "/cate/create.jsp",
    method: "post",
    data: qs.stringify(postData)
  })
}

export const deleteCatesApi = (params) => {
  return request({
    url: "/cate/delete.jsp",
    method: "delete",
    params
  })
}

export const putCatesApi = (postData) => {
  return request({
    url: "/cate/update.jsp",
    method: "put",
    data: qs.stringify(postData)
  })
}
