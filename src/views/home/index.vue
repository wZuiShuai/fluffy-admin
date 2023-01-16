<template>
    <ImportExcelFile v-model="value" lll="999999" />
</template>

<script setup lang="ts" name="home">
import ImportExcelFile from '@/components/Tinymce/index.vue'
import { ref } from 'vue'
const value = ref('hello world!')
</script>

<style scoped lang="scss">

</style>