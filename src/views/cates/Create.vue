<template>
  <czp-card title="创建分类" url="/cates" btnTitle="返回">
    <czp-form
      width="600px"
      :formConfig="formConfig"
      :formBtns="formBtns"
      @submit="getFormDataFn"
    ></czp-form>
  </czp-card>
</template>

<script>
import { getCatesApi, postCatesApi } from "@/api/cates"
export default {
  data() {
    return {
      formConfig: [
        {
          label: "分类名称",
          field: "cat_name",
          type: "text",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        {
          label: "所属分类",
          field: "pid",
          type: "cascader",
          payload: {
            props: { label: "cat_name", value: "cat_id" },
            change: (val) => console.log("所属分类", val)
          }
        },
        {
          label: "关键词",
          field: "keywords",
          type: "text"
        },
        {
          label: "跳转地址",
          field: "url",
          type: "text"
        }
      ],
      formBtns: [
        { content: "提交", type: "primary" },
        { content: "重置", type: "warning" }
      ]
    }
  },
  created() {
    this.getCates()
  },
  methods: {
    getCates() {
      getCatesApi({
        pagesize: 1000,
        level: 2
      }).then((res) => {
        // console.log(res.data.list)
        this.formConfig[1].payload.options = res.data.list
      })
    },
    getFormDataFn(formData) {
      console.log(formData)
      if (formData.pid) formData.pid = formData.pid.pop()
      console.log(formData.pid)
      postCatesApi(formData).then((res) => {
        console.log(res)
        this.createNotify(res, 201)
      })
    }
  }
}
</script>

<style></style>
