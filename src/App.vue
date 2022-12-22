<template>
  <div @click="dd">12132</div>
  <el-button type="primary">Primary</el-button>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus"
import type { Action } from "element-plus"
const dd = () => {
  console.log(12313)

  ElMessageBox.alert("This is a message", "Title", {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: "OK",
    callback: (action: Action) => {
      ElMessage({
        type: "info",
        message: `action: ${action}`,
      })
    },
  })
}
</script>

<style scoped></style>
