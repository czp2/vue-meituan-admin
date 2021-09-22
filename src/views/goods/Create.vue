<template>
  <czp-card title="添加商品" url="/goods" btnTitle="返回" height="90%">
    <czp-form
      width="100%"
      :formConfig="formConfig"
      :formBtns="formBtns"
      @submit="submitFn"
    ></czp-form>

    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </czp-card>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      // 表单配置
      formConfig: [
        {
          label: "商品名称",
          field: "title",
          type: "text",
          rules: [{ required: true, message: "商品名称必须", trigger: "blur" }],
          payload: {
            width: "500px"
          }
        },
        {
          label: "库存",
          field: "goods_number",
          type: "text",
          rules: [{ required: true, message: "库存必须", trigger: "blur" }],
          payload: {
            width: "300px"
          }
        },
        {
          label: "市场价",
          field: "market_price",
          type: "text",
          rules: [{ required: true, message: "市场价配送", trigger: "blur" }],
          payload: {
            width: "300px"
          }
        },
        {
          label: "销售价",
          field: "shop_price",
          type: "text",
          rules: [{ required: true, message: "销售价必须", trigger: "blur" }],
          payload: {
            width: "300px"
          }
        },
        {
          label: "所属门店",
          field: "store_id",
          type: "select",
          rules: [{ required: true, message: "所属门店必须", trigger: "blur" }],
          payload: [
            { label: "a店", value: "a店" },
            { label: "b店", value: "b店" },
            { label: "c店", value: "c店" }
          ]
        }
      ],
      formBtns: [
        { content: "提交", type: "primary" },
        { content: "重置", type: "warning" }
      ]
    }
  },
  methods: {
    submitFn(formData) {
      console.log(formData)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
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

<style lang="scss" scoped></style>
