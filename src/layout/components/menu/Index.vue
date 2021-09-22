<template>
  <div id="menu" :style="{ width: menuWidth }">
    <el-menu
      :uniqueOpened="true"
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#263445"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <el-submenu index="1">
        <template #title>
          <i class="iconfont icon-caidan"></i>
          <span>后台首页</span>
        </template>
        <el-menu-item index="1-1" @click="$router.push('/welcome')"
          ><i class="iconfont icon-gongneng"></i>欢迎页</el-menu-item
        >
        <el-menu-item index="1-2" @click="$router.push('/users/history')"
          ><i class="iconfont icon-gongneng"></i>访客记录</el-menu-item
        >
      </el-submenu>
      <el-submenu index="2">
        <template #title>
          <i class="iconfont icon-caidan"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="2-1" @click="$router.push('/users')"
          ><i class="iconfont icon-gongneng"></i>用户列表</el-menu-item
        >
        <el-menu-item index="2-2" @click="$router.push('/users/create')"
          ><i class="iconfont icon-gongneng"></i>创建用户</el-menu-item
        >
      </el-submenu>
      <el-submenu index="3">
        <template #title>
          <i class="iconfont icon-caidan"></i>
          <span>分类管理</span>
        </template>
        <el-menu-item index="2-1" @click="$router.push('/cates')"
          ><i class="iconfont icon-gongneng"></i>分类列表</el-menu-item
        >
      </el-submenu>
    </el-menu>
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
#menu {
  max-width: 200px;
  height: 100%;
  background-color: #263445;
  transition: all 0.28s;

  .el-menu {
    border: 0;
  }

  i {
    margin-right: 5px;
  }
}
</style>
