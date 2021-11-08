<template>
  <div id="app">
    <div id="login">
      <h1>令牌登录</h1>
      <czp-form
        width="300px"
        labelWidth="0"
        size="medium"
        :formConfig="formConfig"
        :formBtns="formBtns"
        @submit="getFormDataFn"
        @click="clickBtnFn"
      ></czp-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  data() {
    return {
      formConfig: [
        {
          field: "account",
          type: "text",
          placeholder: "请输入手机号或账号",
          icon: "el-icon-mobile",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          field: "token",
          type: "text",
          placeholder: "请输入动态验证码",
          icon: "el-icon-chat-dot-square",
          rules: [
            { required: true, message: "不能为空", trigger: "blur" },
            {
              min: 6,
              max: 6,
              message: "长度在 6 个字符",
              trigger: "blur"
            }
          ]
        }
      ],
      formBtns: [
        { width: "100px", icon: "el-icon-back", type: "" },
        { width: "200px", content: "登录", type: "primary" }
      ]
    }
  },
  methods: {
    ...mapActions({
      login: "login/FETCH_TOKEN_LOGIN"
    }),
    async getFormDataFn(formData) {
      // console.log(formData)
      let res = await this.login(formData)
      if (res.meta.state === 200) {
        this.$message.success(res.meta.msg)
        this.jump("/welcome")
      } else this.$message.error(res.meta.msg)
    },
    clickBtnFn(icon) {
      console.log(icon)
      switch (icon) {
        case "el-icon-back":
          this.jump("/login")
          break
      }
      // this.openDialog("scanLoginData")
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  background-color: #2d3a4b;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  #login {
    position: relative;
    ::v-deep.el-select {
      width: 100%;
    }
    ::v-deep.el-button i {
      margin-left: -8px;
    }
    h1 {
      color: #fff;
      text-align: center;
      margin-bottom: 20px;
    }
    #getSmsFn {
      width: 140px;
      height: 36px;
      position: absolute;
      top: 121px;
      left: 160px;
      border: none;
    }
  }
}
</style>
