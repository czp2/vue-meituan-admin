<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column
      v-for="(item, index) in colunms"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :min-width="item.width"
    >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: { required: true, type: Array },
    /* prop,label,width */
    colunms: { required: true, type: Array }
  }
};
</script>

<style></style>
