<template>
  <czp-card title="订单统计">
    <!-- 统计 -->
    <div class="total">
      <div class="box">
        <div class="order_name">本月销售量</div>
        <div class="order_num">{{ echartsData.now_month_total || 0 }}</div>
      </div>
      <div class="box">
        <div class="order_name">上月销售量</div>
        <div class="order_num">{{ echartsData.prev_month_total }}</div>
      </div>
      <div class="box">
        <div class="order_name">总库存</div>
        <div class="order_num">{{ echartsData.goods_total_number }}</div>
      </div>
      <div class="box">
        <div class="order_name">本月新注册用户</div>
        <div class="order_num">{{ echartsData.now_month_reg }}</div>
      </div>
    </div>
    <!-- 统计 -->

    <!-- 上个月用户每日注册量 -->
    <div class="shadow reg">
      <EchartsReg :data="echartsData.reg_data" :title="echartsData.reg_title" />
    </div>
    <!-- 上个月用户每日注册量 -->

    <!-- 门店 -->
    <div class="store">
      <!-- 上个月每周门店访问量 -->
      <div class="shadow">
        <EchartsPv :data="echartsData.pv_data" :title="echartsData.pv_title" />
      </div>
      <!-- 上个月每周门店销售量 -->
      <div class="shadow">
        <EchartsSell
          :data="echartsData.store_data"
          :title="echartsData.store_title"
        />
      </div>
    </div>
    <!-- 门店 -->
  </czp-card>
</template>

<script>
import { getOrdersTotalApi } from "@/api/orders"
import EchartsReg from "./components/EchartsReg.vue"
import EchartsPv from "./components/EchartsPv.vue"
import EchartsSell from "./components/EchartsSell.vue"
export default {
  components: {
    EchartsReg,
    EchartsPv,
    EchartsSell
  },
  data() {
    return {
      echartsData: {
        now_month_total: 0,
        prev_month_total: 0,
        goods_total_number: 0,
        now_month_reg: 0,
        //<!-- 上个月用户每日注册量 -->
        reg_data: [],
        reg_title: [],
        //<!-- 上个月每周门店访问量 -->
        pv_data: [],
        pv_title: [],
        //<!-- 上个月每周门店销售量 -->
        store_data: [],
        store_title: []
      }
    }
  },
  created() {
    this.getData()
    setInterval(() => {
      this.getData()
    }, 5000)
  },
  methods: {
    getData() {
      getOrdersTotalApi().then((res) => {
        console.log(res)
        this.echartsData = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.total {
  display: flex;
  justify-content: space-between;

  .box {
    width: 22%;
    box-shadow: -3px -4px 5px #ccc;
    padding: 10px;
    border-radius: 10px;

    .order_name {
      font-size: 14px;
      color: #fff;
      line-height: 26px;
    }
    .order_num {
      font-size: 32px;
      font-weight: 900;
      font-family: 黑体;
      color: #fff;
    }

    &:nth-child(1) {
      background: #db5995;
    }
    &:nth-child(2) {
      background: #6dc894;
    }
    &:nth-child(3) {
      background: #cfbd83;
    }
    &:nth-child(4) {
      background: #4d9ec5;
    }
  }
}

.shadow {
  height: 300px;
  box-shadow: 0 0 5px 1px #ccc;
}

.reg {
  margin-top: 30px;
}

.store {
  display: flex;
  justify-content: space-between;

  .shadow {
    width: 49%;
    height: 300px;
    box-shadow: 0 0 5px 1px #ccc;
    margin: 30px 0;
  }
}
</style>
