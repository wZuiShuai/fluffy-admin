<template>
    <el-container>
        <el-aside><Menu /></el-aside>
        <el-container>
            <el-header><Header /></el-header>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts" name="layouts">
import Menu from '@/layouts/components/menu.vue'
import Header from '@/layouts/components/header.vue'
</script>

<style scoped lang="scss">
.el-container {
    height: 100%;
    width: 100%;
    // background-color: var(--el-bg-color);

    .el-aside {
        width: auto;
        border-right: 0.5px solid var(--el-border-color);
    }

    .el-header {
        height: var(--el-header-hight);
        border-bottom: 0.5px solid var(--el-border-color);
    }
}


/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
	transition: all 0.2s;
}
.fade-transform-enter-from {
	opacity: 0;
	transition: all 0.2s;
	transform: translateX(-30px);
}
.fade-transform-leave-to {
	opacity: 0;
	transition: all 0.2s;
	transform: translateX(30px);
}
</style>
