<template>
    <input v-show="false" ref="inputRef" type="file" accept=".xlsx, .xls" @change="handleUploadedFiles" />
</template>

<script setup lang="ts" name="ImportExcelFile">
import { ref } from 'vue'
import * as XLSX from 'xlsx'
import { dateUtil } from './utils/dateUtil'

const props = defineProps<{
    dateFormat?: string
}>()

const emit = defineEmits<{
    (e: 'success', arr: any): void
}>()


const inputRef = ref<HTMLInputElement | null>(null)

const getHeaderRow = (sheet: any) => {
    if (!sheet || !sheet['!ref']) {
        return []
    }
    const headers: string[] = []
    // A3:B7=>{s:{c:0, r:2}, e:{c:1, r:6}}
    const range = XLSX.utils.decode_range(sheet['!ref'])

    const R = range.s.r
    /* start in the first row */
    for (let C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) {
            hdr = XLSX.utils.format_cell(cell)
        }
        headers.push(hdr)
    }
    return headers
}


const getExcelData = (workbook: any) => {
    const excelData = []
    const { dateFormat } = props
    for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName]
        const header: string[] = getHeaderRow(worksheet)
        let results = XLSX.utils.sheet_to_json(worksheet, {
            raw: true,
            dateNF: dateFormat, //Not worked
        }) as object[]
        results = results.map((row: any) => {
            for (let field in row) {
                if (row[field] instanceof Date) {
                    if (dateFormat) {
                        row[field] = dateUtil(row[field]).format(dateFormat)
                    }
                }
            }
            return row
        })

        excelData.push({
            header,
            results,
            meta: {
                sheetName,
            },
        })
    }
    return excelData
}


const readerData = (rawFile: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = async (e) => {
            try {
                const data = e.target && e.target.result
                const workbook = XLSX.read(data, { type: 'array', cellDates: true })
                const excelData = getExcelData(workbook)
                emit('success', excelData)
                resolve('')
            } catch (error) {
                reject(error)
            } /* finally {
                // eslint-disable-next-line no-console
                console.log('调用了FileReader.onload')
            } */
        }
        reader.readAsArrayBuffer(rawFile)
    })
}


//触发文件管理器
const handleUploadedFiles = async (e: any) => {
    const target = e && e.target as HTMLInputElement
    const files = target?.files
    const rawFile = files && files[0]
    target.value = '' //不显示文件名
    if (rawFile) {
        await readerData(rawFile)
    }
}

const handleUpload = () => {
    inputRef.value?.click()
}

defineExpose({
    handleUpload
})
</script>

<style scoped lang="scss">

</style>