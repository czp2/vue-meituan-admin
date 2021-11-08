<template>
  <div>
    <czp-card title="用户列表" url="/users/create" btnTitle="创建">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="params.uname">
            <template #append>
              <el-button icon="el-icon-search" @click="getData"></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="8">&nbsp;</el-col>
        <el-col :span="8"
          ><el-date-picker
            @change="dateChangeFn"
            v-model="dateData"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-col>
      </el-row>

      <czp-table :tableData="tableData" :columns="columns"></czp-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pagenum"
        :page-sizes="[4, 5, 8, 10]"
        :page-size="4"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataTotal"
      >
      </el-pagination>
    </czp-card>

    <!-- 修改用户弹框 -->
    <Edit
      :data="dialogData.editData"
      :getData="getData"
      @close="dialogCloseFn('editData')"
    ></Edit>
    <EditRole
      width="30%"
      :getData="getData"
      :data="dialogData.editRoleData"
      @close="dialogCloseFn('editRoleData')"
    ></EditRole>
  </div>
</template>

<script>
// import tableData from "~mock/users"
import Edit from "./components/Edit.vue"
import EditRole from "./components/EditRole.vue"

import { getUsersApi, deleteUsersApi, putUsersStateApi } from "@/api/users"

export default {
  components: { Edit, EditRole },
  data() {
    return {
      params: {
        pagenum: 1,
        pagesize: 4,
        start_time: "",
        end_time: "",
        uname: ""
      },
      tableDataTotal: 0,
      tableData: [],
      dateData: [],
      dialogData: {
        editData: {
          dialogVisible: false,
          title: "",
          row: {}
        },
        editRoleData: {
          dialogVisible: false,
          title: "",
          row: {}
        }
      },
      columns: [
        { prop: "user_id", label: "编号" },
        { prop: "username", label: "姓名" },
        { prop: "role_name", label: "角色" },
        { prop: "mobile", label: "联系方式" },
        {
          prop: "state",
          label: "是否冻结",
          type: "switch",
          change: (row) => {
            console.log("修改", row)
            putUsersStateApi({ user_id: row.user_id, state: row.state }).then(
              (res) => {
                console.log(res)
                this.createNotify(res, 200, () => {
                  this.getData()
                })
              }
            )
          }
        },
        { prop: "create_time", label: "更新时间" },
        {
          label: "操作",
          type: "btns",
          width: "300px",
          payload: [
            {
              type: "primary",
              name: "修改",
              click: (row) => {
                console.log("修改", row)
                this.openDialog("editData", "修改", row)
              }
            },
            {
              type: "info",
              name: "分配",
              click: (row) => {
                console.log("分配", row)
                this.openDialog("editRoleData", "分配", row)
              }
            },
            {
              type: "danger",
              name: "删除",
              click: (row) => {
                console.log("删除", row)
                this.deleteRowFn(row)
              }
            }
          ]
        }
      ]
    }
  },
  methods: {
    //初始化
    getData() {
      getUsersApi(this.params).then((res) => {
        this.tableDataTotal = parseInt(res.data.total)
        this.tableData = res.data.list
      })
    },
    handleSizeChange(val) {
      this.params.pagenum = 1
      this.params.pagesize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.params.pagenum = val
      this.getData()
    },
    dateChangeFn() {
      this.params.start_time = this.dateData[0]
      this.params.end_time = this.dateData[1]
      this.getData()
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
        deleteUsersApi(row).then((res) => {
          this.createNotify(res, 200, () => {
            this.getData()
          })
        })
      })
    },
    dialogCloseFn(dialogName) {
      this.dialogData[dialogName].dialogVisible = false
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped></style>
