<template>
    <div @click="jsonToSheetXlsx">
        home
    </div>
</template>

<script setup lang="ts" name="home">
const data = [
    { id: '0', name: '0 John Brown', age: '', no: '098678', address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park', lll: '123' },
    { id: '1', name: '0 John Brown122333333333333333333333', age: '1', no: '098678', address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park', lll: '123' }
]
const jsonToSheetXlsx = () => {
    import ('@/utils/Excel').then(Excel => { //异步引入
        Excel.jsonToSheet({ data })

    })

}
</script>

<style scoped lang="scss">

</style>