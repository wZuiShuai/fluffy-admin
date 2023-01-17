<template>
    <ImportExcelFile @change="handleChange" />
</template>

<script setup lang="ts" name="home">
import ImportExcelFile from '@/components/Tinymce/index.vue'

const handleChange = (e:string) => {
    // eslint-disable-next-line no-console
    console.log(e)

}
</script>

<style scoped lang="scss">
</style>