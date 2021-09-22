<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>分类列表</span>
        <el-button type="primary" @click="jump('/users/create')"
          >待补充</el-button
        >
      </div>
    </template>

    <czp-table
      rowKey="cat_id"
      :tableData="tableData"
      :columns="columns"
    ></czp-table>

    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="10000"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import tableData from "~mock/cates"

export default {
  data() {
    return {
      tableData,
      columns: [
        { label: "分类编号", prop: "cat_id" },
        { label: "分类名称", prop: "name" },
        {
          label: "分类层级",
          prop: "level",
          type: "tags",
          payload: {
            type: "success",
            effect: "dark"
          }
        }
      ]
    }
  }
}
</script>

<style></style>
