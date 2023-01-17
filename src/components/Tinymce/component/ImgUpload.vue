<template>
    <el-upload
        v-loading.fullscreen.lock="uploading"
        multiple
        :action="baseURL"
        :show-file-list="false"
        accept=".jpg,.jpeg,.gif,.png,.webp"
        @change="handleChange"
    >
        <el-button type="primary">图片上传</el-button>
    </el-upload>
</template>

<script setup lang="ts">
import { UploadFile } from 'element-plus'
import { ref } from 'vue'

const emit = defineEmits<{
    (e: 'ready', name: string): void
    (e: 'success', name: string, baseURL: string): void
    (e: 'fail'): void
}>()

const baseURL = import.meta.env.VITE_API_URL

const uploading = ref<boolean>(false)

const handleChange = (info: UploadFile) => {
    const status = info.status
    const name = info.name
    if (status === 'ready') {
        emit('ready', name)
        uploading.value = true
    } else if (status === 'success') {
        emit('success', name, info.url as string)
        uploading.value = false
    } else if (status === 'fail') {
        emit('fail')
        uploading.value = false
    }
}
</script>

<style scoped lang="scss">
</style>