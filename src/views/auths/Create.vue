<template>
  <czp-card title="添加权限" url="/auths" btnTitle="返回">
    <czp-form
      width="600px"
      labelWidth="150px"
      :formConfig="formConfig"
      :formBtns="formBtns"
      @submit="getFormDataFn"
    ></czp-form
  ></czp-card>
</template>

<script>
import { postAuthsApi, getAuthsApi } from "@/api/auths"

export default {
  data() {
    return {
      formConfig: [
        {
          label: "权限名称",
          field: "auth_name",
          type: "text",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          label: "权限后期访问地址",
          field: "url",
          type: "text",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          label: "所属组件",
          field: "father",
          type: "select",
          payload: [],
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          label: "是否缓存",
          field: "keep_alive",
          type: "select",
          payload: [
            { label: "缓存", value: true },
            { label: "不缓存", value: false }
          ],
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          label: "权限组件路径",
          field: "component",
          type: "text",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        }
      ],
      formBtns: [
        { content: "提交", type: "primary" },
        { content: "重置", type: "warning" }
      ]
    }
  },
  created() {
    getAuthsApi().then((res) => {
      let temp = res.data.map((item) => {
        return {
          label: item.auth_name,
          value: `${item.auth_id}_${item.auth_name}`
        }
      })
      this.formConfig[2].payload = temp
    })
  },
  methods: {
    getFormDataFn(data) {
      // console.log(data.father)
      data.auth_pid = data.father.split("_")[0]
      data.auth_pname = data.father.split("_")[1]
      console.log(data)
      postAuthsApi(data).then((res) => {
        this.createNotify(res, 201)
      })
    }
  }
}
</script>

<style></style>
