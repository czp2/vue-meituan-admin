<template>
  <czp-card title="用户列表" url="/users" btnTitle="返回">
    <czp-form
      width="600px"
      :formConfig="formConfig"
      :formBtns="formBtns"
      @submit="getFormDataFn"
    ></czp-form>
  </czp-card>
</template>

<script>
export default {
  data() {
    return {
      formConfig: [
        {
          label: "账号",
          field: "username",
          type: "text",
          rules: [
            { required: true, message: "不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
          ]
        },
        {
          label: "密码",
          field: "password",
          type: "password",
          rules: [
            { required: true, message: "不能为空", trigger: "blur" },
            {
              min: 8,
              max: 16,
              message: "长度在 8 到 16 个字符",
              trigger: "blur"
            }
          ]
        },
        {
          label: "密保问题",
          field: "question",
          type: "select",
          payload: [
            { label: "父亲的名字", value: "父亲的名字" },
            { label: "母亲的名字", value: "母亲的名字" },
            { label: "大学学校的名字", value: "大学学校的名字" }
          ],
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          label: "密保答案",
          field: "anwser",
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
    getFormDataFn(data) {
      console.log(data)
    }
  }
}
</script>

<style></style>
