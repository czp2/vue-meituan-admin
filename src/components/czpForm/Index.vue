<template>
  <div id="czpForm">
    <el-form
      ref="form"
      :model="formData"
      :label-width="labelWidth"
      :style="{ width: width }"
      :size="size"
    >
      <!-- 表单选项 -->
      <el-form-item
        v-for="(item, index) in formConfig"
        :prop="item.field"
        :key="index"
        :label="item.label"
        :label-width="item.labelWidth || labelWidth"
        :rules="item.rules"
        :style="{ width: item.width ? item.width : '100%' }"
        :size="size"
      >
        <!-- 普通文本框 -->
        <el-input
          v-if="item.type === 'text'"
          v-model="formData[item.field]"
          :disabled="Boolean(item.disabled)"
          :placeholder="item.placeholder"
          :prefix-icon="item.icon"
          clearable
        >
        </el-input>

        <!-- 密码框 -->
        <el-input
          v-else-if="item.type === 'password'"
          v-model="formData[item.field]"
          :placeholder="item.placeholder"
          :prefix-icon="item.icon"
          clearable
          show-password
        >
        </el-input>

        <!-- 级联选择器 -->
        <el-cascader
          v-else-if="item.type === 'cascader'"
          v-model="formData[item.field]"
          :options="item.payload.options"
          :props="item.payload.props || { label: 'label' }"
          @change="item.payload.change"
          change-on-select
        ></el-cascader>

        <!-- 选择器 -->
        <el-select
          v-else-if="item.type === 'select'"
          v-model="formData[item.field]"
          :placeholder="item.placeholder"
          :disabled="Boolean(item.disabled)"
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
      <el-form-item v-if="formBtns && formBtns.length" label-width="0">
        <el-button
          v-for="(btnItem, index) in formBtns"
          :size="size"
          :key="index"
          :type="btnItem.type"
          :icon="btnItem.icon"
          :style="{ width: btnItem.width }"
          @click="btnFn(btnItem.content, btnItem.icon)"
        >
          {{ btnItem.icon ? "" : btnItem.content }}
        </el-button>
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
    size: { type: String, default: "mini" },
    formConfig: { require: true, type: Array },
    formBtns: { require: false, type: Array },
    row: {
      require: false,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      formData: this.row
    }
  },
  methods: {
    btnFn(content, icon) {
      if (!content) {
        this.$emit("click", icon)
        return
      } else {
        if (content === "重置") this.$refs["form"].resetFields()
        else if (
          content === "提交" ||
          content === "创建" ||
          content === "登录"
        ) {
          this.$refs["form"].validate((valid) => {
            if (valid) {
              this.$emit("submit", this.formData)
            } else {
              console.log("error submit!!")
              return false
            }
          })
        }
      }
    }
  },
  watch: {
    row: {
      handler(newData) {
        this.formData = newData
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
