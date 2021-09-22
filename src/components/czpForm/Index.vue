<template>
  <div id="czpForm">
    <el-form
      ref="form"
      :model="formData"
      :label-width="labelWidth"
      :style="{ width: width }"
    >
      <!-- 表单选项 -->
      <el-form-item
        v-for="(item, index) in formConfig"
        :prop="item.field"
        :key="index"
        :label="item.label"
        :label-width="item.width"
        :rules="item.rules"
        :style="{ width: item.payload ? item.payload.width : '100%' }"
        size="mini"
      >
        <!-- 普通文本框 -->
        <el-input
          v-model="formData[item.field]"
          v-if="item.type === 'text'"
          :disabled="item.disabled"
          placeholder="请输入"
          clearable
        >
        </el-input>

        <!-- 密码框 -->
        <el-input
          v-model="formData[item.field]"
          placeholder="请输入"
          v-else-if="item.type === 'password'"
          clearable
          show-password
        >
        </el-input>

        <!-- 级联选择器 -->
        <el-cascader
          v-else-if="item.type === 'cascader'"
          :options="item.payload.options"
          :props="formData[item.field]"
          @change="item.payload.change"
        ></el-cascader>

        <!-- 选择器 -->
        <el-select
          v-else-if="item.type === 'select'"
          v-model="formData[item.field]"
          placeholder="请选择"
        >
          <el-option
            v-for="optionItem in item.payload"
            :key="optionItem.value"
            :label="optionItem.label"
            :value="optionItem.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <!-- 表单按钮 -->
      <el-form-item
        v-if="formBtns && formBtns.length"
        style="text-align: center"
        label-width="0"
      >
        <el-button
          size="mini"
          v-for="(btnItem, index) in formBtns"
          :key="index"
          :type="btnItem.type"
          @click="btnFn(btnItem.content)"
          >{{ btnItem.content }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    // width:表单宽度
    // formConfig:[{label,width,field,type,rules}]
    // formBtns:[{content,type}]
    labelWidth: { type: String, default: "80px" },
    width: { type: String, default: "80%" },
    formConfig: { require: true, type: Array },
    formBtns: { require: false, type: Array },
    formData: {
      require: false,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      // formData: {}
    }
  },
  methods: {
    btnFn(content) {
      switch (content) {
        case "重置":
          this.$refs["form"].resetFields()
          break
        case "提交":
          console.log(1)
          this.$refs["form"].validate((valid) => {
            console.log(2)
            if (valid) {
              console.log(3)
              this.$emit("submit", this.formData)
            } else {
              console.log("error submit!!")
              return false
            }
          })
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
