import request from "@/utils/request"
import qs from "qs"

export const postTokenLoginApi = (postData) => {
  return request({
    url: "/token/login.jsp",
    method: "post",
    data: qs.stringify(postData)
  })
}
