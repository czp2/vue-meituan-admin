<template>
  <div id="app">
    <div id="login" class="animated bounceInDown">
      <h1>美团后台管理系统</h1>
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
    <ScanLogin width="40%" :data="dialogData.scanLoginData"></ScanLogin>
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    >
    </vue-particles>
  </div>
</template>

<script>
// import { postUsersLoginApi } from "@/api/users"
import ScanLogin from "./components/ScanLogin.vue"
import { mapActions } from "vuex"
export default {
  components: {
    ScanLogin
  },
  data() {
    return {
      dialogData: {
        scanLoginData: {
          dialogVisible: false,
          title: "",
          content: ""
        }
      },
      formConfig: [
        {
          field: "question",
          type: "select",
          placeholder: "请选择密保问题",
          payload: [
            { label: "您其中一位老师的名字", value: "您其中一位老师的名字" },
            { label: "父亲的名字", value: "父亲的名字" },
            { label: "母亲的名字", value: "母亲的名字" },
            { label: "你的梦想是什么", value: "你的梦想是什么" }
          ],
          rules: [{ required: true, message: "不能为空", trigger: "change" }]
        },
        {
          field: "answer",
          type: "text",
          placeholder: "请回答密保问题",
          icon: "el-icon-unlock",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          field: "uname",
          type: "text",
          placeholder: "请输入用户名",
          icon: "el-icon-s-custom",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          field: "pwd",
          type: "password",
          placeholder: "请输入密码",
          icon: "el-icon-key",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        }
      ],
      formBtns: [
        { width: "10px", icon: "el-icon-crop", type: "primary" },
        { width: "10px", icon: "el-icon-mobile-phone", type: "primary" },
        { width: "10px", icon: "el-icon-key", type: "primary" },
        { width: "100px", content: "登录", type: "primary" }
      ]
    }
  },
  methods: {
    ...mapActions({
      login: "login/FETCH_MB_LOGIN"
    }),
    async getFormDataFn(formData) {
      // console.log(formData)
      let res = await this.login(formData)
      // console.log(res)
      if (res.meta.state === 200) {
        this.$message.success(res.meta.msg)
        this.jump("/welcome")
      } else this.$message.error(res.meta.msg)
      // await postUsersLoginApi(formData).then((res) => {
      //   this.createMessage(res, 200, () => {
      //     localStorage.setItem("token", res.data.token)
      //     localStorage.setItem("uname", res.data.uname)
      //     localStorage.setItem("roleName", res.data.roleName)
      //     this.jump("/welcome")
      //   })
      // })
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
        case "el-icon-crop":
          this.openDialog("scanLoginData")
          break
        case "el-icon-mobile-phone":
          this.jump("/login/sms")
          break
        case "el-icon-key":
          this.jump("/login/token")
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
    z-index: 3;
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
  }
}

.lizi {
  //   background-image: url(../../assets/imgs/login.jpg);
  background-size: cover;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
