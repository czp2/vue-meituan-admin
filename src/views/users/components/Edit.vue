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
    //dialogVisible,title
    data: { type: Object, default: null }
  },
  data() {
    return {
      formConfig: [
        {
          label: "用户名",
          field: "name",
          type: "text",
          rules: [
            { required: true, message: "不能为空", trigger: "blur" },
            { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
          ]
        },
        {
          label: "手机号",
          field: "mobile",
          type: "text",
          rules: [
            { required: true, message: "不能为空", trigger: "blur" },
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
          payload: [
            { label: "正常", value: true },
            { label: "冻结", value: false }
          ],
          rules: []
        },
        {
          label: "密保问题",
          field: "question",
          type: "select",
          payload: [
            { label: "父亲的名字", value: "父亲的名字" },
            { label: "母亲的名字", value: "母亲的名字" },
            { label: "大学学校的名字", value: "大学学校的名字" }
          ],
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          label: "密保答案",
          field: "anwser",
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
    getFormDataFn(data) {
      console.log(data)
    }
  }
}
</script>

<style></style>
