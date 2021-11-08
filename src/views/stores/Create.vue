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

import { postStoresApi } from "@/api/stores"
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
      this.$refs.base.$children[0].$children[0].validate((valid) => {
        if (valid) {
          let baseData = this.$refs.base.$children[0].$data.formData
          baseData.img = this.$refs.base.$data.imgData

          this.$refs.filter.$children[0].$children[0].validate((valid) => {
            if (valid) {
              let filterData = this.$refs.filter.$children[0].$data.formData
              let imgsData = this.$refs.imgs.$data.imgs
              let mapData = this.$refs.map.$data.location
              let address = this.$refs.map.$data.address

              let postData = {
                ...baseData,
                cat_id: filterData.cat_id[filterData.cat_id.length - 1],
                area_id: filterData.area_id[filterData.area_id.length - 1],
                sjts: filterData.sjts,
                rjj: filterData.rjj,
                yhhd: filterData.yhhd,
                imgs: imgsData.join(","),
                lat: mapData.lat,
                lng: mapData.lng,
                address
              }

              console.log("postData", postData)
              postStoresApi(postData).then((res) => {
                this.createNotify(res, 201)
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style></style>
