<template>
  <div>
    <el-upload
      action="http://kg.zhaodashen.cn/mt/admin/upload.jsp"
      list-type="picture-card"
      :on-remove="handleRemove"
      :on-success="handleAvatarSuccess"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imgs: []
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(res)
      if (res.meta.state == 201) {
        this.imgs.push(res.data.img)
        console.log(this.imgs)
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      this.imgs = fileList.map((item) => {
        return item.response.data.img
      })
      console.log(this.imgs)
    }
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // }
  }
}
</script>

<style></style>
