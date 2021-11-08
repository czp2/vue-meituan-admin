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
      <el-submenu
        v-for="item in menu"
        :key="item.auth_id"
        :index="item.auth_id"
      >
        <template #title>
          <i class="iconfont icon-caidan"></i>
          <span>{{ item.auth_name }}</span>
        </template>
        <el-menu-item
          v-for="sonItem in item.children"
          :key="sonItem.auth_id"
          :index="item.auth_id + '-' + sonItem.auth_id"
          @click="$router.push(sonItem.url)"
        >
          <i class="iconfont icon-gongneng"></i>
          {{ sonItem.auth_name }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  props: {
    menuWidth: { type: String },
    isCollapse: { type: Boolean }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      menu: (state) => state.auth.menu
    })
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
  transition: all 0.3s;

  .el-menu {
    border: 0;
  }

  i {
    margin-right: 5px;
  }
}
</style>
