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
import { putUsersApi } from "@/api/users"
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
          label: "用户名",
          field: "username",
          type: "text",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          label: "手机号",
          field: "mobile",
          type: "text",
          rules: [
            {
              validator: (rule, value, callback) => {
                if (!/^1\d{10}$/.test(value)) return callback("格式有误")
                else return callback()
              },
              trigger: "blur"
            }
          ]
        },
        {
          label: "冻结状态",
          field: "state",
          type: "select",
          disabled: "true",
          payload: [
            { label: "正常", value: "1" },
            { label: "冻结", value: "0" }
          ],
          rules: []
        },
        {
          label: "密保问题",
          field: "passwd_question",
          type: "select",
          payload: [
            { label: "父亲的名字", value: "父亲的名字" },
            { label: "母亲的名字", value: "母亲的名字" },
            { label: "大学学校的名字", value: "大学学校的名字" }
          ]
          // rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          label: "密保答案",
          field: "passwd_answer",
          type: "text"
          // rules: [{ required: true, message: "不能为空", trigger: "blur" }]
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
      formData.user_id = this.data.row.user_id
      formData.question = formData.passwd_question
      formData.answer = formData.passwd_answer
      putUsersApi(formData).then((res) => {
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
