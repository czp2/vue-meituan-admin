<template>
  <el-dialog
    :title="data.title"
    :visible.sync="data.dialogVisible"
    :width="width"
    :close="handleClose"
  >
    <czp-form
      width="100%"
      :formConfig="formConfig"
      :formBtns="formBtns"
      :row="data.row"
      @submit="getFormDataFn"
    ></czp-form>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleClose"
        >确 定</el-button
      >
    </span> -->
  </el-dialog>
</template>

<script>
import { putRolesApi } from "@/api/roles"

export default {
  props: {
    width: { type: String, default: "50%" },
    //dialogVisible,title
    data: { type: Object, default: null },
    getData: Function
  },
  data() {
    return {
      formConfig: [
        {
          label: "角色名称",
          field: "role_name",
          type: "text",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          label: "角色描述",
          field: "role_describe",
          type: "text",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        }
      ],
      formBtns: [
        { content: "提交", type: "primary" },
        { content: "重置", type: "warning" }
      ]
    }
  },
  methods: {
    handleClose() {
      this.$emit("close")
    },
    getFormDataFn(formData) {
      console.log(formData)
      putRolesApi(formData).then((res) => {
        this.createNotify(res, 200, () => {
          this.getData()
          this.handleClose()
        })
      })
    }
  }
}
</script>

<style></style>
