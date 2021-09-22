<template>
  <div id="admin">
    <!-- <h1>Hello</h1> -->
    <Menu></Menu>
    <div id="main">
      <Top></Top>
      <div id="content">
        <router-view></router-view>
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
    return {}
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
      overflow-y: auto;
      align-self: center;
    }
  }
}
</style>
