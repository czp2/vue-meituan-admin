<template>
  <czp-card title="添加角色" url="/roles" btnTitle="返回">
    <czp-form
      width="600px"
      :formConfig="formConfig"
      :formBtns="formBtns"
      @submit="getFormDataFn"
    ></czp-form>
  </czp-card>
</template>

<script>
import { postRolesApi } from "@/api/roles"

export default {
  data() {
    return {
      formConfig: [
        {
          label: "角色名称",
          field: "role_name",
          type: "text",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          label: "角色描述",
          field: "role_describe",
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
  methods: {
    getFormDataFn(formData) {
      postRolesApi(formData).then((res) => {
        console.log(res)
        this.createNotify(res, 201, () => {
          //TODO. 闪存
          localStorage.setItem("upd", 1)
        })
      })
    }
  }
}
</script>

<style></style>
