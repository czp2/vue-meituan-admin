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
      <el-sub-menu index="1">
        <template #title>
          <i class="iconfont icon-caidan"></i>
          <span>后台首页</span>
        </template>
        <el-menu-item index="1-1"
          ><i class="iconfont icon-gongneng"></i>欢迎页</el-menu-item
        >
        <el-menu-item index="1-2"
          ><i class="iconfont icon-gongneng"></i>访客记录</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <i class="iconfont icon-caidan"></i>
          <span>后台首页</span>
        </template>
        <el-menu-item index="2-1"
          ><i class="iconfont icon-gongneng"></i>选项3</el-menu-item
        >
        <el-menu-item index="2-2"
          ><i class="iconfont icon-gongneng"></i>选项4</el-menu-item
        >
      </el-sub-menu>
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
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
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
