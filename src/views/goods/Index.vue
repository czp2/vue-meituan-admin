<template>
  <div>
    <czp-card title="商品列表" url="/goods/create" btnTitle="添加">
      <czp-table :tableData="tableData" :columns="columns"></czp-table>

      <el-pagination
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10000"
      >
      </el-pagination>
    </czp-card>
  </div>
</template>

<script>
import tableData from "~mock/goods"

export default {
  data() {
    return {
      tableData: tableData.data,
      columns: [
        { label: "编号", fixed: "left", prop: "id" },
        { label: "所属门店", prop: "store" },
        { label: "封面", type: "img", prop: "img" },
        { label: "标题", type: "tips", prop: "title", width: "200" },
        { label: "库存", prop: "goods_number" },
        { label: "市场价", prop: "market_price" },
        { label: "促销价", prop: "shop_price" },
        { label: "创建时间", prop: "create_time" },
        { label: "状态", prop: "state" },
        {
          fixed: "right",
          label: "操作",
          width: "180",
          type: "btns",
          payload: [
            {
              name: "修改商品",
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
