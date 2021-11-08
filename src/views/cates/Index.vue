<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>分类列表</span>
          <el-button type="primary" @click="jump('/cates/create')"
            >创建分类</el-button
          >
        </div>
      </template>

      <czp-table
        rowKey="cat_id"
        :tableData="tableData"
        :columns="columns"
      ></czp-table>

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
    </el-card>
    <!-- 修改用户弹框 -->
    <Edit
      :data="dialogData.editData"
      :getData="getData"
      @close="dialogCloseFn('editData')"
    ></Edit>
  </div>
</template>

<script>
import Edit from "./components/Edit.vue"
import { getCatesApi, deleteCatesApi } from "@/api/cates"

export default {
  components: {
    Edit
  },
  data() {
    return {
      params: {
        pagenum: 1,
        pagesize: 4,
        level: 3
      },
      tableData: [],
      tableDataTotal: 0,
      dialogData: {
        editData: {
          dialogVisible: false,
          title: "",
          row: {}
        }
      },
      columns: [
        { label: "分类编号", prop: "cat_id" },
        { label: "分类名称", prop: "cat_name" },
        {
          label: "分类层级",
          prop: "level",
          type: "tags",
          payload: {
            type: "success",
            effect: "dark",
            filterName: "cateFilter"
          }
        },
        {
          label: "操作",
          type: "btns",
          width: "150px",
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
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getCatesApi(this.params).then((res) => {
        // console.log(res)
        this.tableData = res.data.list
        this.tableDataTotal = parseInt(res.data.total)
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
    openDialog(dataName, title, row) {
      this.dialogData[dataName] = {
        dialogVisible: true,
        title,
        row
      }
    },
    dialogCloseFn(dialogName) {
      this.dialogData[dialogName].dialogVisible = false
    },
    deleteRowFn(row) {
      this.globalDelete(row, (row) => {
        deleteCatesApi(row).then((res) => {
          this.createNotify(res, 200, () => {
            this.getData()
          })
        })
      })
    }
  }
}
</script>

<style></style>
