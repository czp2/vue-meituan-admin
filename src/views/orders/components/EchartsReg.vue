<template>
  <div style="width: 100%; height: 100%" ref="mychart"></div>
</template>

<script>
import echarts from "echarts"
export default {
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    title: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  watch: {
    title() {
      this.initMyChart()
    }
  },
  mounted() {
    this.initMyChart()
  },
  methods: {
    initMyChart() {
      // 基于准备好的dom，初始化echarts实例
      const mychart = echarts.init(this.$refs.mychart)
      // 指定图表的配置项和数据
      let option = {
        xAxis: {
          type: "category",
          data: this.title
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "line",
            data: this.data
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      mychart.setOption(option)
    }
  }
}
</script>

<style></style>
