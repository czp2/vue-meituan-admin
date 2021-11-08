<template>
  <div>
    <czp-card title="订单列表">
      <el-row :gutter="24">
        <el-col :span="2">
          <el-button type="primary" @click="downloadExcelFn">excel</el-button>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="订单号" v-model="params.order_sn">
            <template #append>
              <el-button icon="el-icon-search" @click="getData"></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="下单人" v-model="params.uname">
            <template #append>
              <el-button icon="el-icon-search" @click="getData"></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="收货人" v-model="params.consignee">
            <template #append>
              <el-button icon="el-icon-search" @click="getData"></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="6"
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
        :page-sizes="[5, 20, 50, 100]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataTotal"
      >
      </el-pagination>
    </czp-card>
  </div>
</template>

<script>
import { getOrdersApi, deleteOrdersApi } from "@/api/orders"
import { download } from "webopenfather-excel"
export default {
  data() {
    return {
      params: {
        pagenum: 1,
        pagesize: 5,
        start_time: "",
        end_time: "",
        order_sn: "",
        consignee: "",
        uname: ""
      },
      tableDataTotal: 0,
      tableData: [],
      dateData: [],
      columns: [
        { label: "数据编号", prop: "order_id", width: "200", fixed: "left" },
        { label: "订单编号", prop: "no", width: "200" },
        { label: "订单号", prop: "order_sn", width: "200" },
        { label: "下单人", prop: "username", width: "100" },
        { label: "收货人", prop: "consignee", width: "100" },
        { label: "总额", prop: "order_amount", width: "100" },
        {
          label: "订单状态",
          type: "tags",
          width: "100",
          prop: "order_status",
          payload: {
            // type: "primary",
            filterName: "orderStatusFilter"
          }
        },
        {
          label: "支付状态",
          width: "100",
          type: "tags",
          prop: "pay_status",
          payload: {
            // type: "primary",
            filterName: "payStatusFilter"
          }
        },
        {
          label: "配送状态",
          width: "100",
          type: "tags",
          prop: "shipping_status",
          payload: {
            // type: "primary",
            filterName: "shippingStatusFilter"
          }
        },
        { label: "创建于", prop: "add_time", width: "180" },
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
      getOrdersApi(this.params).then((res) => {
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
        deleteOrdersApi(row).then((res) => {
          this.createNotify(res, 200, () => {
            this.getData()
          })
        })
      })
    },
    downloadExcelFn() {
      let title = []
      this.columns.forEach((item) => {
        if (item.label !== "操作") title.push(item.label)
      })
      let list = this.tableData.map((item) => {
        return {
          order_id: item.order_id,
          no: item.no,
          order_sn: item.order_sn,
          username: item.username,
          consignee: item.consignee,
          order_amount: item.order_amount,
          order_status: item.order_status,
          pay_status: item.pay_status,
          shipping_status: item.shipping_status,
          add_time: item.add_time
        }
      })
      download("美团订单数据", title, list)
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style></style>
