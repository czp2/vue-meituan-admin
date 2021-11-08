<template>
  <div id="top">
    <div class="left">
      <el-tooltip
        class="item"
        effect="dark"
        content="展开/折叠"
        placement="bottom"
      >
        <div class="btn" @click="menuBtnFn"><i :class="menuIcon"></i></div>
      </el-tooltip>

      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <transition enter-active-class="animated fadeIn">
          <el-breadcrumb-item :key="name1">{{ name1 }}</el-breadcrumb-item>
        </transition>
        <transition enter-active-class="animated fadeInRight">
          <el-breadcrumb-item :key="name2">{{ name2 }}</el-breadcrumb-item>
        </transition>
      </el-breadcrumb>
    </div>
    <div class="right">
      <span>{{ uname }} {{ roleName }}</span>
      <el-tooltip class="item" effect="dark" content="退出" placement="bottom">
        <i class="iconfont icon-tuichu" @click="logoutFn"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
        <i class="iconfont icon-fangda" @click="screenfullFn"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import screenfull from "screenfull"
export default {
  props: {
    isCollapse: { type: Boolean }
  },
  data() {
    return {
      name1: "",
      name2: "",
      menuIcon: "el-icon-s-fold"
    }
  },
  computed: {
    ...mapState({
      uname: (state) => state.login.uname,
      roleName: (state) => state.login.roleName
    })
  },
  methods: {
    screenfullFn() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: "不支持全屏哦",
          type: "warning"
        })
        return false
      }
      screenfull.toggle()
    },
    ...mapMutations({
      logout: "login/DELETE_USERINFO",
      resetMenu: "auth/DELETE_MENU"
    }),
    logoutFn() {
      this.logout()
      this.resetMenu()
      this.jump("/login")
    },
    menuBtnFn() {
      this.$emit("menuChange")
      this.menuIcon = this.isCollapse ? "el-icon-s-fold" : "el-icon-s-unfold"
    }
  },
  watch: {
    $route(newData) {
      console.log(newData)
      this.name1 = newData.meta.name1
      this.name2 = newData.meta.name2
    }
  }
}
</script>

<style lang="scss" scoped>
#top {
  height: 50px;
  width: 100%;
  border-bottom: 1px black solid;
  display: flex;
  justify-content: space-between;

  .left {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 99;
    .btn {
      height: 100%;
      width: 50px;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .btn:hover {
      background: rgba(0, 0, 0, 0.025);
      cursor: pointer;
    }
  }
  .right {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    i {
      font-size: 24px;
    }
    :nth-child(n) {
      margin-right: 20px;
    }
  }
}
</style>
