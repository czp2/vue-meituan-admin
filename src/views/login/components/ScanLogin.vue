<template>
  <el-dialog
    :title="data.title"
    :visible.sync="data.dialogVisible"
    :width="width"
    :close="handleClose"
  >
    这是扫码登录
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
    return {}
  },
  methods: {
    handleClose() {
      this.$emit("close")
    }
  }
}
</script>

<style></style>
