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
      action="http://kg.zhaodashen.cn/mt/admin/upload.jsp"
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
import { getStoresApi } from "@/api/stores"
import { postGoodsApi } from "@/api/goods"
export default {
  data() {
    return {
      imageUrl: "",
      goods_img: "",
      // 表单配置
      formConfig: [
        {
          label: "商品名称",
          field: "goods_name",
          type: "text",
          width: "800px",
          rules: [{ required: true, message: "商品名称必须", trigger: "blur" }]
        },
        {
          label: "库存",
          field: "goods_number",
          type: "text",
          width: "500px",
          rules: [{ required: true, message: "库存必须", trigger: "blur" }]
        },
        {
          label: "市场价",
          field: "market_price",
          type: "text",
          width: "500px",
          rules: [{ required: true, message: "市场价配送", trigger: "blur" }]
        },
        {
          label: "销售价",
          field: "shop_price",
          type: "text",
          width: "500px",
          rules: [{ required: true, message: "销售价必须", trigger: "blur" }]
        },
        {
          label: "所属门店",
          field: "store_id",
          type: "select",
          width: "500px",
          rules: [{ required: true, message: "所属门店必须", trigger: "blur" }],
          payload: []
        }
      ],
      formBtns: [
        { content: "提交", type: "primary" },
        { content: "重置", type: "warning" }
      ]
    }
  },
  created() {
    getStoresApi({ pagesize: 1000 }).then((res) => {
      this.formConfig[4].payload = res.data.list.map((item) => {
        return { label: item.title, value: item.id }
      })
    })
  },
  methods: {
    submitFn(formData) {
      formData.goods_img = this.goods_img
      console.log(formData)
      postGoodsApi(formData).then((res) => {
        this.createNotify(res, 201)
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      // console.log(res.data.img)
      this.goods_img = res.data.img
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
