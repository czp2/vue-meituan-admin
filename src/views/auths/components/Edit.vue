<template>
  <el-dialog
    :title="data.title"
    :visible.sync="data.dialogVisible"
    :width="width"
    :close="handleClose"
  >
    <czp-form
      width="100%"
      labelWidth="30%"
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
import { getAuthsApi, putAuthsApi } from "@/api/auths"
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
          label: "权限名称",
          field: "auth_name",
          type: "text",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          label: "权限后期访问地址",
          field: "url",
          type: "text",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          label: "所属组件",
          field: "father",
          type: "select",
          payload: [],
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          label: "是否缓存",
          field: "keep_alive",
          type: "select",
          payload: [
            { label: "缓存", value: "1" },
            { label: "不缓存", value: "0" }
          ],
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          label: "权限组件路径",
          field: "component",
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
  created() {
    getAuthsApi().then((res) => {
      let temp = res.data.map((item) => {
        return {
          label: item.auth_name,
          value: `${item.auth_id}_${item.auth_name}`
        }
      })
      this.formConfig[2].payload = temp
    })
  },
  methods: {
    handleClose() {
      this.$emit("close")
    },
    getFormDataFn(data) {
      console.log(data)
      putAuthsApi(data).then((res) => {
        this.createNotify(res, 200, () => {
          this.handleClose()
          this.getData()
        })
      })
    }
  }
}
</script>

<style></style>
