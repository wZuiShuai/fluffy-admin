<template>
    <el-config-provider :locale="i18nLocale">
        <router-view />
    </el-config-provider>
</template>

<script setup lang="ts" name="app">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { computed } from 'vue'
import { main } from '@/store'
const mainStore = main()

// element 语言配置
const i18nLocale = computed(() => {
    return mainStore.i18n == 'zh' ? zhCn : en
})
</script>

<style scoped></style>
