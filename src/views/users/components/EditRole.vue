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
  </el-dialog>
</template>

<script>
import { putUsersAssignApi } from "@/api/users"
import { getRolesApi } from "@/api/roles"
export default {
  props: {
    width: { type: String, default: "50%" },
    //dialogVisible,title,row
    data: { type: Object, default: null },
    getData: Function
  },
  data() {
    return {
      // formData: this.data.row,
      formConfig: [
        {
          label: "当前用户",
          field: "username",
          type: "text",
          disabled: true
        },
        {
          label: "当前角色",
          field: "role_name",
          type: "text",
          disabled: true
        },

        {
          label: "修改角色",
          field: "role_id",
          type: "select",
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
    getRolesApi().then((res) => {
      console.log(res)
      let temp = res.data.map((item) => {
        return {
          label: item.role_name,
          value: item.role_id
        }
      })
      this.formConfig[2].payload = temp
    })
  },
  methods: {
    handleClose() {
      this.$emit("close")
    },
    getFormDataFn(formData) {
      console.log(formData)
      putUsersAssignApi(formData).then((res) => {
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
