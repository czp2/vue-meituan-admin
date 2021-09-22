<template>
  <czp-card title="门店列表" url="/stores/create" btnTitle="创建">
    <czp-table :tableData="tableData" :columns="columns"></czp-table>

    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="10000"
    >
    </el-pagination>
  </czp-card>
</template>

<script>
import tableData from "~mock/stores"

export default {
  data() {
    return {
      tableData: tableData.data,
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
        { label: "联系方式", prop: "mobile", width: "120" },
        { label: "营业时间", prop: "work", width: "170" },
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
              click: (row) => this.deleteFn(row)
            }
          ]
        }
      ]
    }
  }
}
</script>

<style></style>
