import request from "@/utils/request"

export const getAreasApi = (params) => {
  return request({
    url: "/areas/index.jsp",
    method: "get",
    params
  })
}
