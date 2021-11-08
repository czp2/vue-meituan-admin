<template>
  <czp-form width="60%" :formConfig="formConfig"></czp-form>
</template>

<script>
import { getCatesApi } from "@/api/cates"
import { getAreasApi } from "@/api/areas"

export default {
  data() {
    return {
      // 表单配置
      formConfig: [
        {
          label: "所属分类",
          field: "cat_id",
          type: "cascader",
          payload: {
            change: (val) => console.log("所属分类", val),
            props: { label: "cat_name", value: "cat_id" },
            options: []
          },
          rules: [
            { required: true, message: "所属分类必须", trigger: "change" }
          ]
        },
        {
          label: "所属地区",
          field: "area_id",
          type: "cascader",
          payload: {
            change: (val) => console.log("所属地区", val),
            props: { label: "area_name", value: "area_id" },
            options: []
          },
          rules: [
            { required: true, message: "所属地区必须", trigger: "change" }
          ]
        },
        {
          label: "商家特色",
          field: "sjts",
          type: "select",
          payload: [
            { label: "全部", value: "" },
            { label: "免费配送", value: "免费配送" },
            { label: "新商家", value: "新商家" },
            { label: "品牌商家", value: "品牌商家" },
            { label: "支持开票", value: "支持开票" }
          ],
          rules: []
        },
        {
          label: "人均价",
          field: "rjj",
          type: "select",
          payload: [
            { label: "全部", value: "" },
            { label: "20元以下", value: "20元以下" },
            { label: "20~40元", value: "20~40元" },
            { label: "40元以上", value: "40元以上" }
          ],
          rules: []
        },
        {
          label: "优惠活动",
          field: "yhhd",
          type: "select",
          payload: [
            { label: "全部", value: "" },
            { label: "优惠商家", value: "优惠商家" },
            { label: "折扣商品", value: "折扣商品" },
            { label: "买赠活动", value: "买赠活动" }
          ],
          rules: []
        }
      ]
    }
  },
  created() {
    this.getCascaderData()
  },
  methods: {
    getCascaderData() {
      getCatesApi({ pagesize: 1000 }).then((res) => {
        console.log(res.data.list)
        this.formConfig[0].payload.options = res.data.list
      })
      getAreasApi({ pagesize: 1000 }).then((res) => {
        console.log(res.data)
        this.formConfig[1].payload.options = res.data
      })
    }
  }
}
</script>

<style></style>
