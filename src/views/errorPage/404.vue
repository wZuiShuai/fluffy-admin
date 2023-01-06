<template>
    <el-empty>
        <el-button @click="router.push({name:'home'})">返回首页</el-button>
    </el-empty>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped lang="scss">
.el-empty{
    height: 100%;
}
</style>
