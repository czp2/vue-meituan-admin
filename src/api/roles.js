import request from "@/utils/request"
import qs from "qs"

export const getRolesApi = (params) => {
  return request({
    url: "/roles/index.jsp",
    method: "get",
    params
  })
}

export const postRolesApi = (postData) => {
  return request({
    url: "/roles/create.jsp",
    method: "post",
    data: qs.stringify(postData)
  })
}

export const putRolesApi = (postData) => {
  return request({
    url: "/roles/update.jsp",
    method: "put",
    data: qs.stringify(postData)
  })
}

export const putRolesAssignApi = (postData) => {
  return request({
    url: "/roles/assign.jsp",
    method: "put",
    data: qs.stringify(postData)
  })
}

export const deleteRolesApi = (params) => {
  return request({
    url: "/roles/delete.jsp",
    method: "delete",
    params
  })
}
