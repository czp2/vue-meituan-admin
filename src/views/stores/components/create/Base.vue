<template>
  <div id="base">
    <czp-form width="100%" :formConfig="formConfig"></czp-form>

    <el-upload
      class="avatar-uploader"
      action="http://kg.zhaodashen.cn/mt/admin/upload.jsp"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      imgData: "",
      formConfig: [
        {
          label: "标题",
          field: "title",
          type: "text",
          width: "500px",
          rules: [{ required: true, message: "标题必须", trigger: "blur" }]
        },
        {
          label: "起送",
          field: "start_price",
          type: "text",
          rules: [{ required: true, message: "起送必须", trigger: "blur" }],
          width: "300px"
        },
        {
          label: "夜间配送",
          field: "send_price",
          type: "text",
          rules: [{ required: true, message: "夜间配送", trigger: "blur" }],
          width: "300px"
        },
        {
          label: "人均",
          field: "avg_price",
          type: "text",
          rules: [{ required: true, message: "人均必须", trigger: "blur" }],
          width: "300px"
        },
        {
          label: "电话",
          field: "tel",
          type: "text",
          rules: [{ required: true, message: "电话必须", trigger: "blur" }],
          width: "300px"
        },
        {
          label: "营业时间",
          field: "work_time",
          type: "text",
          rules: [{ required: true, message: "营业时间必须", trigger: "blur" }],
          width: "300px"
        }
      ]
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(res)
      if (res.meta.state == 201) {
        this.imgData = res.data.img
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg"
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!")
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!")
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
#base {
  position: relative;
  .avatar-uploader {
    position: absolute;
    top: 64px;
    left: 318px;
  }
}
</style>
