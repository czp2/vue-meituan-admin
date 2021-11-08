import Vue from "vue"

Vue.mixin({
  methods: {
    jump(path) {
      if (path === this.$route.path) return
      return this.$router.push(path)
    },
    createNotify(res, successState, callback) {
      if (res.meta.state == successState) {
        this.$notify({
          title: "成功",
          message: res.meta.msg,
          type: "success"
        })
        if (callback) callback()
      } else {
        this.$notify.error({
          title: "错误",
          message: res.meta.msg
        })
      }
    },
    createMessage(res, successState, callback) {
      if (res.meta.state == successState) {
        this.$message({
          message: res.meta.msg,
          type: "success"
        })
        if (callback) callback()
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    globalDelete(row, success, error) {
      this.$confirm("此操作将删除此数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (success) success(row)
        })
        .catch(() => {
          if (error) error
        })
    }
  }
})
