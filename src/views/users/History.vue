<template>
  <czp-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="params.uname">
          <template #append>
            <el-button icon="el-icon-search" @click="getData"></el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="9">&nbsp;</el-col>
      <el-col :span="9"
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

    <czpTable :tableData="tableData" :columns="columns"></czpTable>

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
// import tableData from "~mock/users/history"
import { getUsersHistoryApi } from "@/api/users"

export default {
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
      columns: [
        { prop: "id", label: "编号" },
        { prop: "username", label: "姓名" },
        { prop: "type", label: "方式" },
        { prop: "city", label: "地址" },
        { prop: "login_time", label: "登录时间" },
        { prop: "prev_login_time", label: "上次登录时间" }
      ]
    }
  },
  methods: {
    getData() {
      getUsersHistoryApi(this.params).then((res) => {
        console.log(res)
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
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped></style>
