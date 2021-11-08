<template>
  <div>
    <czp-card title="商品列表" url="/goods/create" btnTitle="添加">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="params.goods_name">
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
  </div>
</template>

<script>
import { getGoodsApi, deleteGoodsApi } from "@/api/goods"

export default {
  data() {
    return {
      params: {
        pagenum: 1,
        pagesize: 4,
        start_time: "",
        end_time: "",
        goods_name: ""
      },
      tableDataTotal: 0,
      tableData: [],
      dateData: [],
      columns: [
        { label: "编号", prop: "goods_id", fixed: "left" },
        { label: "所属门店", prop: "store_id" },
        { label: "封面", prop: "goods_img", type: "img" },
        { label: "标题", prop: "goods_name", type: "tips", width: "200" },
        { label: "库存", prop: "goods_number" },
        { label: "市场价", prop: "market_price" },
        { label: "促销价", prop: "shop_price" },
        { label: "促销", prop: "is_sell", type: "switch" },
        { label: "新商品", prop: "is_new", type: "switch" },
        { label: "热门商品", prop: "is_hot", type: "switch" },
        { label: "创建时间", prop: "create_time" },
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
      getGoodsApi(this.params).then((res) => {
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
        deleteGoodsApi(row).then((res) => {
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
