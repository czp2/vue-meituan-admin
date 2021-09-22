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
export default {
  props: {
    width: { type: String, default: "50%" },
    //dialogVisible,title,row
    data: { type: Object, default: null }
  },
  data() {
    return {
      // formData: this.data.row,
      formConfig: [
        {
          label: "当前状态",
          field: "state",
          type: "text",
          disabled: true
        },

        {
          label: "冻结状态",
          field: "state",
          type: "select",
          payload: [
            { label: "正常", value: true },
            { label: "冻结", value: false }
          ]
        }
      ],
      formBtns: [{ content: "提交", type: "primary" }]
    }
  },
  methods: {
    handleClose() {
      this.$emit("close")
    },
    getFormDataFn(data) {
      console.log(data)
    }
  }
}
</script>

<style></style>
