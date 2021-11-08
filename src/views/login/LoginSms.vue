<template>
  <div id="app">
    <div id="login">
      <h1>短信登录</h1>
      <czp-form
        ref="form"
        width="300px"
        labelWidth="0"
        size="medium"
        :formConfig="formConfig"
        :formBtns="formBtns"
        @submit="getFormDataFn"
        @click="clickBtnFn"
      ></czp-form>

      <el-button
        type="info"
        id="getSmsFn"
        :disabled="smsData.disabled"
        @click="smsBtnFn"
        >{{ smsData.smsTips }}</el-button
      >
    </div>
  </div>
</template>

<script>
import { postSendSmsApi } from "@/api/sms"
import { mapActions } from "vuex"

export default {
  data() {
    return {
      smsData: {
        smsNumber: 3,
        smsTips: "获取动态验证码",
        disabled: false,
        timer: null
      },
      dialogData: {
        scanLoginData: {
          dialogVisible: false,
          title: "",
          content: ""
        }
      },
      formConfig: [
        {
          field: "mobile",
          type: "text",
          placeholder: "请输入手机号",
          icon: "el-icon-mobile",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          field: "code",
          type: "text",
          placeholder: "请输入动态验证码",
          icon: "el-icon-chat-dot-square",
          rules: [
            { required: true, message: "不能为空", trigger: "blur" },
            {
              min: 4,
              max: 4,
              message: "长度为 4 个字符",
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
      login: "login/FETCH_SMS_LOGIN"
    }),
    async getFormDataFn(formData) {
      // console.log(formData)
      let res = await this.login(formData)
      // console.log(res)
      if (res.meta.state === 200) {
        this.$message.success(res.meta.msg)
        this.jump("/welcome")
      } else this.$message.error(res.meta.msg)
    },
    openDialog(dataName, title, row) {
      this.dialogData[dataName] = {
        dialogVisible: true,
        title,
        row
      }
    },
    clickBtnFn(icon) {
      console.log(icon)
      switch (icon) {
        case "el-icon-back":
          this.jump("/login")
          break
      }
      // this.openDialog("scanLoginData")
    },
    smsBtnFn() {
      let mobile = this.$refs.form.$data.formData.mobile
      console.log(mobile)
      if (/^1\d{10}$/.test(mobile)) {
        this.smsData.disabled = true
        this.smsData.timer = setInterval(() => {
          this.smsData.smsTips = `重新获取(${this.smsData.smsNumber})`
          if (this.smsData.smsNumber <= 0) {
            this.smsData.smsTips = "获取动态验证码"
            this.smsData.disabled = false
            this.smsData.smsNumber = 3
            clearInterval(this.smsData.timer)
            return
          }
          this.smsData.smsNumber--
        }, 1000)
      }
      postSendSmsApi({ mobile }).then((res) => {
        this.createMessage(res, 201)
      })
    }
  },
  destroyed() {
    clearInterval(this.smsData.timer)
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
