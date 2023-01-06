<template>
    <el-config-provider :locale="i18nLocale">
        <router-view />
    </el-config-provider>
</template>

<script setup lang="ts" name="app">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { computed, provide } from 'vue'
import { main } from '@/store'
import { useDark, useToggle } from '@vueuse/core'
const mainStore = main()

// element 语言配置
const i18nLocale = computed(() => {
    return mainStore.i18n === 'zh' ? zhCn : en
})

//黑暗模式
const isDark = useDark()
const toggleDark = useToggle(isDark)

provide('toggleDark', toggleDark)
provide('isDark',isDark)
</script>

<style scoped></style>
