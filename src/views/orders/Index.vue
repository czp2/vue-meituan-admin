<template>
  <div>
    <czp-card title="订单列表">
      <el-row :gutter="20">
        <el-col :span="4"
          ><el-input placeholder="编号">
            <template #append>
              <el-button icon="el-icon-search"></el-button>
            </template> </el-input
        ></el-col>
        <el-col :span="4">
          <el-input placeholder="下单人">
            <template #append>
              <el-button icon="el-icon-search"></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4"
          ><el-input placeholder="收货人">
            <template #append>
              <el-button icon="el-icon-search"></el-button>
            </template> </el-input
        ></el-col>
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="6"
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
  </div>
</template>

<script>
import tableData from "~mock/orders"

export default {
  data() {
    return {
      tableData: tableData.data,
      columns: [
        { label: "编号", prop: "id", width: "200" },
        { label: "下单人", prop: "uname1", width: "100" },
        { label: "收货人", prop: "uname2", width: "100" },
        { label: "总额", prop: "price", width: "100" },
        {
          label: "订单状态",
          type: "tags",
          width: "100",
          prop: "order_state",
          payload: {
            // type: "primary",
            filterName: "orderStatusFilter"
          }
        },
        {
          label: "支付状态",
          width: "100",
          type: "tags",
          prop: "pay_state",
          payload: {
            // type: "primary",
            filterName: "payStatusFilter"
          }
        },
        {
          label: "配送状态",
          width: "100",
          type: "tags",
          prop: "send_state",
          payload: {
            // type: "primary",
            filterName: "shippingStatusFilter"
          }
        },
        { label: "创建于", prop: "create_time", width: "180" },
        {
          label: "操作",
          width: "160",
          fixed: "right",
          type: "btns",
          payload: [
            {
              //   name: "修改",
              icon: "el-icon-edit",
              type: "primary",
              click: (row) => {
                console.log("修改", row)

                // 1 显示弹框
                this.editState = true
                // 2.
              }
            },
            {
              //   name: "删除",
              icon: "el-icon-delete",
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
