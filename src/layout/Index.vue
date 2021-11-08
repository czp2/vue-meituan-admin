<template>
  <div id="admin">
    <!-- <h1>Hello</h1> -->
    <Menu :isCollapse="isCollapse" :menuWidth="menuWidth"></Menu>
    <div id="main">
      <Top
        :isCollapse="isCollapse"
        @menuChange="
          menuWidth = isCollapse ? '200px' : '64px'
          isCollapse = !isCollapse
        "
      ></Top>
      <div id="content">
        <transition enter-active-class="animated fadeInRight">
          <keep-alive>
            <router-view v-if="$route.meta.keep_alive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keep_alive"></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { Menu, Top } from "./components"
export default {
  components: {
    Menu,
    Top
  },
  data() {
    return {
      isCollapse: false,
      menuWidth: "200px"
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
#admin {
  width: 100%;
  height: 100%;
  display: flex;

  #main {
    flex: 1;
    height: 100%;
    background: whitesmoke;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    #content {
      flex: 1;
      margin-top: 20px;
      width: 96%;
      overflow-x: hidden;
      overflow-y: auto;
      align-self: center;
    }
  }
}
</style>
