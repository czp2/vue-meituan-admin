<template>
  <div>
    <czp-form
      width="80px"
      :formConfig="formConfig"
      :formBtns="formBtns"
      @submit="getFormDataFn"
    ></czp-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formConfig: [
        {
          label: "账号",
          width: "",
          field: "username",
          type: "text",
          rules: [
            { required: true, message: "不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
          ]
        },
        {
          label: "密码",
          width: "",
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
        }
      ],
      formBtns: [
        { content: "提交", type: "primary" },
        { content: "重置", type: "wraning" }
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
