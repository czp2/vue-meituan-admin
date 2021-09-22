<template>
  <div>
    <czp-card title="用户列表" url="/users/create" btnTitle="创建">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <template #append>
              <el-button icon="el-icon-search"></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="8">&nbsp;</el-col>
        <el-col :span="8"
          ><el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-col>
      </el-row>

      <czp-table :tableData="tableData" :columns="columns"></czp-table>

      <el-pagination
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10000"
      >
      </el-pagination>
    </czp-card>

    <!-- 修改用户弹框 -->
    <Edit
      :data="dialogData.editData"
      @close="dialogData.dialogVisible = false"
    ></Edit>
    <EditRole
      width="20%"
      :data="dialogData.editRoleData"
      @close="dialogData.dialogVisible = false"
    ></EditRole>
  </div>
</template>

<script>
import tableData from "~mock/users"
import Edit from "./components/Edit.vue"
import EditRole from "./components/EditRole.vue"
export default {
  components: { Edit, EditRole },
  data() {
    return {
      currentPage: 5,
      dialogData: {
        editData: {
          dialogVisible: false,
          title: "",
          content: ""
        },
        editRoleData: {
          dialogVisible: false,
          title: "",
          content: ""
        }
      },
      tableData: tableData.data,
      columns: [
        { prop: "id", label: "编号" },
        { prop: "uname", label: "方式" },
        { prop: "role_name", label: "角色" },
        { prop: "mobile", label: "联系方式" },
        {
          prop: "state",
          label: "是否冻结",
          type: "switch",
          change: (row) => {
            console.log("修改", row)
          }
        },
        { prop: "update_time", label: "更新时间" },
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
    openDialog(dataName, title, row) {
      this.dialogData[dataName] = {
        dialogVisible: true,
        title,
        row
      }
    },
    deleteRowFn(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          })
          console.log(row)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
