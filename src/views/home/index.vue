<template>
    <div>
        <div @click="input?.handleUpload()">123123</div>
        <ImportExcelFile ref="input" @success="loadDataSuccess" />
    </div>
</template>

<script setup lang="ts" name="home">
import ImportExcelFile from '@/components/ImportExcelFile/index.vue'
import type { ImportExcel } from '@/components/ImportExcelFile/utils/interface'
import { ref } from 'vue'


const loadDataSuccess = (e: any) => {
    console.log(e)
}


const input = ref<ImportExcel>()
</script>

<style scoped lang="scss">

</style>