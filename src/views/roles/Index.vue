<template>
  <div>
    <czp-card title="角色列表" url="/roles/create" btnTitle="添加">
      <czp-table :tableData="tableData" :columns="columns"></czp-table>
    </czp-card>
    <Edit
      width="40%"
      :data="dialogData.editData"
      :getData="getData"
      @close="dialogCloseFn('editData')"
    ></Edit>
    <EditAuth
      width="50%"
      :data="dialogData.editAuthData"
      :getData="getData"
      @close="dialogCloseFn('editAuthData')"
    ></EditAuth>
  </div>
</template>

<script>
// import tableData from "~mock/roles"
import Edit from "./components/Edit.vue"
import EditAuth from "./components/EditAuth.vue"

import { getRolesApi, deleteRolesApi } from "@/api/roles"
export default {
  components: { Edit, EditAuth },
  data() {
    return {
      tableData: [],
      dialogData: {
        editData: {
          dialogVisible: false,
          title: "",
          row: {}
        },
        editAuthData: {
          dialogVisible: false,
          title: "",
          row: {}
        }
      },
      columns: [
        { label: "角色编号", fixed: "left", prop: "role_id" },
        { label: "角色名称", prop: "role_name" },
        { label: "角色描述", prop: "role_describe" },
        {
          fixed: "right",
          label: "操作",
          width: "260",
          type: "btns",
          payload: [
            {
              type: "primary",
              name: "分配",
              click: (row) => {
                console.log("分配", row)
                this.openDialog("editAuthData", "分配", row)
              }
            },
            {
              name: "编辑",
              icon: "el-icon-edit",
              type: "warning",
              click: (row) => {
                console.log("修改", row)

                // 1 显示弹框
                this.openDialog("editData", "修改", row)
                // 2.
              }
            },
            {
              name: "删除",
              icon: "el-icon-delete",
              type: "danger",
              click: (row) => this.deleteRowFn(row)
            }
          ]
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  activated() {
    let upd = parseInt(localStorage.getItem("upd"))
    if (upd) {
      this.getData()
      localStorage.setItem("upd", 0)
    }
  },
  methods: {
    getData() {
      getRolesApi().then((res) => {
        console.log(res.data)
        this.tableData = res.data
      })
    },
    openDialog(dataName, title, row) {
      this.dialogData[dataName] = {
        dialogVisible: true,
        title,
        row
      }
    },
    deleteRowFn(row) {
      this.globalDelete(row, (row) => {
        deleteRolesApi(row).then((res) => {
          this.createNotify(res, 200, () => {
            this.getData()
          })
        })
      })
    },
    dialogCloseFn(dialogName) {
      console.log(dialogName, "关闭")
      this.dialogData[dialogName].dialogVisible = false
    }
  }
}
</script>

<style></style>
