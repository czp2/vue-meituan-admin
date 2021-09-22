<template>
  <el-table
    :row-key="rowKey"
    :data="tableData"
    style="width: 100%"
    stripe
    highlight-current-row
  >
    <template v-for="(item, index) in columns">
      <el-table-column
        :key="index"
        v-if="!item.type"
        :prop="item.prop"
        :label="item.label"
        :fixed="item.fixed"
        align="center"
      ></el-table-column>
      <el-table-column
        v-else
        :key="index"
        :width="item.width"
        :label="item.label"
        :fixed="item.fixed"
        align="center"
      >
        <template slot-scope="scope">
          <!-- switch -->
          <template v-if="item.type === 'switch'">
            <el-switch
              v-model="scope.row[item.prop]"
              active-color="#ff4949"
              inactive-color="#13ce66"
              @change="item.change(scope.row.state)"
            ></el-switch>
          </template>

          <!-- tags -->
          <template v-else-if="item.type === 'tags'">
            <el-tag
              :key="item.prop"
              :type="
                item.payload.type || scope.row[item.prop] | elTagTypeFilter
              "
              :effect="item.payload.effect"
            >
              {{ scope.row[item.prop] | cateFilter }}
            </el-tag>
          </template>

          <!-- img -->
          <template v-else-if="item.type === 'img'">
            <img :src="scope.row[item.prop]" alt="img" />
          </template>

          <!-- tips -->
          <template v-else-if="item.type === 'tips'">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row[item.prop]"
              placement="top"
            >
              <span>{{ scope.row[item.prop] | substrFilter(8) }}</span>
            </el-tooltip>
          </template>

          <!-- btns -->
          <template v-else-if="item.type === 'btns'">
            <el-button
              size="mini"
              v-for="(btnItem, btnIndex) in item.payload"
              :key="btnIndex"
              :type="btnItem.type"
              @click="btnItem.click(scope.row)"
            >
              {{ btnItem.name }}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  props: {
    rowKey: { required: false, type: String },
    tableData: { required: true, type: Array },
    /* prop,label */
    columns: { required: true, type: Array }
  },
  methods: {}
}
</script>

<style></style>
