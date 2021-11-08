<template>
  <div>
    <czp-card title="权限列表" url="/auths/create" btnTitle="添加">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>

      <el-tree
        :data="treeData"
        :props="defaultProps"
        node-key="id"
        :expand-on-click-node="false"
        :default-expand-all="true"
        highlight-current
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span v-if="!data.children">
            <el-button
              type="text"
              size="mini"
              @click="() => editFn(node, data)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </czp-card>
    <Edit width="40%" :data="dialogData.editData" :getData="getData"></Edit>
  </div>
</template>

<script>
import Edit from "./components/Edit.vue"
import { getAuthsApi, deleteAuthsApi } from "@/api/auths"
export default {
  components: { Edit },
  data() {
    return {
      dialogData: {
        editData: {
          dialogVisible: false,
          title: "角色编辑",
          row: {}
        }
      },
      filterText: "",
      treeData: [],
      defaultProps: {
        children: "children",
        label: "auth_name"
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getAuthsApi().then((res) => {
        console.log(res)
        this.treeData = res.data
      })
    },
    openDialog(dataName, title, row) {
      this.dialogData[dataName] = {
        dialogVisible: true,
        title,
        row
      }
    },
    editFn(node, data) {
      console.log(node, data)
      this.openDialog("editData", "编辑权限", data)
    },
    remove(node, data) {
      console.log(node, data)
      this.globalDelete(data, (data) => {
        deleteAuthsApi(data).then((res) => {
          this.createNotify(res, 200)
          this.getData()
        })
      })
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
