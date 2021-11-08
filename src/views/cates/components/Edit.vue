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
      :row="data.row"
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
import { getCatesApi, putCatesApi } from "@/api/cates"

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
          label: "分类名称",
          field: "cat_name",
          type: "text",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          label: "所属分类",
          field: "pid",
          type: "cascader",
          payload: {
            props: { label: "cat_name", value: "cat_id" },
            change: (val) => console.log("所属分类", val)
          }
        },
        {
          label: "关键词",
          field: "keywords",
          type: "text"
        },
        {
          label: "跳转网址",
          field: "url",
          type: "text"
        }
      ],
      formBtns: [
        { content: "提交", type: "primary" },
        { content: "重置", type: "warning" }
      ]
    }
  },
  created() {
    this.getCates()
  },
  methods: {
    handleClose() {
      this.$emit("close")
    },
    getFormDataFn(formData) {
      console.log(formData)
      formData.pid = Array.isArray(formData.pid) ? formData.pid.pop() : 0
      console.log(formData)
      putCatesApi(formData).then((res) => {
        this.createNotify(res, 200, () => {
          this.getData()
          this.handleClose()
        })
      })
    },
    getCates() {
      getCatesApi({
        pagesize: 1000,
        level: 2
      }).then((res) => {
        // console.log(res.data.list)
        this.formConfig[1].payload.options = res.data.list
      })
    }
  }
}
</script>

<style></style>
