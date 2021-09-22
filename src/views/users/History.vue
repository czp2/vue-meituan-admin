<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>卡片名称</span>
        <el-button class="button" type="text">操作按钮</el-button>
      </div>
    </template>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入内容">
          <template #append>
            <el-button icon="el-icon-search"></el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="9">&nbsp;</el-col>
      <el-col :span="9"
        ><el-date-picker
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-col>
    </el-row>

    <czpTable :tableData="tableData" :columns="columns"></czpTable>

    <el-pagination
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="10000"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import tableData from "~mock/users/history"
export default {
  data() {
    return {
      currentPage: 5,
      columns: [
        { prop: "id", label: "编号" },
        { prop: "name", label: "姓名" },
        { prop: "label", label: "方式" },
        { prop: "address", label: "地址" },
        { prop: "login_time", label: "登录时间" },
        { prop: "last_login_time", label: "上次登录时间" }
      ],
      tableData: tableData.data
    }
  }
}
</script>

<style lang="scss" scoped></style>
