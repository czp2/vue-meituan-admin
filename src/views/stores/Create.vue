<template>
  <czp-card title="门店创建" url="/stores" btnTitle="返回" height="90%">
    <el-tabs v-model="activeName" style="height=100vh">
      <el-tab-pane label="基本信息" name="base">
        <CreateBase ref="base"></CreateBase>
      </el-tab-pane>
      <el-tab-pane label="门店筛选" name="filter">
        <CreateFilter ref="filter"></CreateFilter>
      </el-tab-pane>
      <el-tab-pane label="门店相册" name="imgs">
        <CreateImgs ref="imgs"></CreateImgs>
      </el-tab-pane>
      <el-tab-pane label="门店地图" name="map">
        <CreateMap ref="map"></CreateMap>
      </el-tab-pane>
    </el-tabs>

    <el-button v-if="activeName === 'base'" @click="submitFn">提交</el-button>
  </czp-card>
</template>

<script>
import CreateBase from "./components/create/Base.vue"
import CreateFilter from "./components/create/Filter.vue"
import CreateImgs from "./components/create/Imgs.vue"
import CreateMap from "./components/create/Map.vue"
export default {
  components: {
    CreateBase,
    CreateFilter,
    CreateImgs,
    CreateMap
  },
  data() {
    return {
      activeName: "base"
    }
  },
  methods: {
    submitFn() {
      //   console.log(this.$refs.base.$children[0]),, "imgs", "map"
      let arr = ["base", "filter"]
      arr.forEach((item) => {
        this.$refs[item].$children[0].$children[0].validate((valid) => {
          if (valid) {
            console.log(console.log(this.$refs.base.$children[0]).formData)
          }
        })
      })
    }
  }
}
</script>

<style></style>
