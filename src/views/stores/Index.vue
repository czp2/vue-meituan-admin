<template>
  <czp-card title="门店列表" url="/stores/create" btnTitle="创建">
    <el-row :gutter="24">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="params.title">
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

    <czp-table
      rowKey="id"
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
  </czp-card>
</template>

<script>
import { getStoresApi, deleteStoresApi } from "@/api/stores"

export default {
  data() {
    return {
      params: {
        pagenum: 1,
        pagesize: 4,
        start_time: "",
        end_time: "",
        title: ""
      },
      tableDataTotal: 0,
      tableData: [],
      dateData: [],
      columns: [
        { label: "编号", fixed: "left", prop: "id" },
        { label: "封面", type: "img", prop: "img" },
        {
          label: "标题",
          type: "tips",
          prop: "title",
          width: "160"
        },
        { label: "好评", prop: "comment_good_count" },
        { label: "差评", prop: "comment_bad_count" },
        { label: "总评", prop: "comment_count" },
        { label: "销量", prop: "sell_count" },
        { label: "联系方式", prop: "tel", width: "120" },
        { label: "营业时间", prop: "work_time", width: "170" },
        {
          fixed: "right",
          label: "操作",
          width: "200",
          type: "btns",
          payload: [
            {
              name: "修改门店",
              type: "primary",
              click: (row) => {
                console.log("修改", row)
                // 1 显示弹框
                this.editState = true
                // 2.
              }
            },
            {
              name: "删除",
              type: "danger",
              click: (row) => this.deleteRowFn(row)
            }
          ]
        }
      ]
    }
  },
  methods: {
    //初始化
    getData() {
      getStoresApi(this.params).then((res) => {
        console.log(res.data)
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
    deleteRowFn(row) {
      this.globalDelete(row, (row) => {
        deleteStoresApi({ store_id: row.id }).then((res) => {
          this.createNotify(res, 200, () => {
            this.getData()
          })
        })
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style></style>
