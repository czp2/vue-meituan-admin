import request from "@/utils/request"
import qs from "qs"

export const postSendSmsApi = (postData) => {
  return request({
    url: "/sms/send.jsp",
    method: "post",
    data: qs.stringify(postData)
  })
}

export const postSmsLoginApi = (postData) => {
  return request({
    url: "/sms/login.jsp",
    method: "post",
    data: qs.stringify(postData)
  })
}
