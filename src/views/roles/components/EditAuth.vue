<template>
  <el-dialog
    :title="data.title"
    :visible.sync="data.dialogVisible"
    :width="width"
    :close="handleClose"
  >
    <el-tree
      :data="authsData"
      node-key="auth_id"
      ref="tree"
      :props="defaultProps"
      :default-checked-keys="
        data.row.auth_ids_son ? data.row.auth_ids_son.split(',') : []
      "
      show-checkbox
      highlight-current
    >
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button size="mini" type="primary" @click="submitFn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAuthsApi } from "@/api/auths"
import { putRolesAssignApi } from "@/api/roles"
export default {
  props: {
    width: { type: String, default: "50%" },
    //dialogVisible,title
    data: { type: Object, default: null },
    getData: Function
  },
  data() {
    return {
      authsData: [],
      defaultCheckedKeys: [],
      defaultProps: {
        children: "children",
        label: "auth_name"
      }
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        getAuthsApi().then((res) => {
          this.authsData = res.data
        })
        console.log(111)
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit("close")
    },
    submitFn() {
      // console.log(data)
      let checkedData = this.$refs.tree.getCheckedNodes()
      let auth_ids = []
      let auth_ids_son = []
      checkedData.forEach((item) => {
        if (item.auth_pid != 0) auth_ids.push(item.auth_pid)
        auth_ids.push(item.auth_id)
        if (item.auth_pid != 0) auth_ids_son.push(item.auth_id)
      })
      auth_ids = [...new Set(auth_ids)]
      // console.log(auth_ids)
      // console.log(auth_ids_son)
      putRolesAssignApi({
        role_id: this.data.row.role_id,
        auth_ids: auth_ids.join(","),
        auth_ids_son: auth_ids_son.join(",")
      }).then((res) => {
        this.createNotify(res, 200, () => {
          console.log(res)
          this.getData()
          this.handleClose()
        })
      })
    }
  }
}
</script>

<style></style>
