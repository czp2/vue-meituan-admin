<template>
  <div id="top">
    <div class="left">
      <div class="btn"><i :class="menuIcon"></i></div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <span>czp 超级管理员</span>
      <i class="iconfont icon-tuichu"></i>
      <i class="iconfont icon-fangda"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menuWidth: "200px",
      menuIcon: "el-icon-s-fold"
    }
  },
  methods: {
    // menuIconFn() {
    //   this.isCollapse = !this.isCollapse;
    //   this.menuIcon = this.isCollapse ? "el-icon-s-unfold" : "el-icon-s-fold";
    //   this.menuWidth = this.isCollapse ? "64px" : "200px";
    // }
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
