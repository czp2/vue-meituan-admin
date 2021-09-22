<template>
  <el-card class="box-card" :style="'height:' + height + ';overflow-y:auto'">
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        @click="jump(url)"
        >{{ btnTitle }}</el-button
      >
    </div>

    <slot></slot>
  </el-card>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    url: { type: String, default: "" },
    btnTitle: { type: String, default: "" },
    height: { type: String, default: "auto" }
  }
}
</script>

<style></style>
