<template>
    <div class="menu" :style="{ width: isExpand ? '220px' : '65px' }">
        <router-link class="logo f-center" to="/">
            <img src="@/assets/vue.svg" alt="logo" />
            <span v-show="isExpand" class="logoTitle">{{ title }}</span>
        </router-link>
        <el-scrollbar>
            <el-menu
                :default-active="activeMenu"
                :router="false"
                :collapse="!isExpand"
                :collapse-transition="false"
                :unique-opened="true"
            >
                <template v-for="subItem in layoutChildren" :key="subItem.name">
                    <!-- 有子路由 -->
                    <el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.name">
                        <template #title>
                            <el-icon>
                                <component :is="subItem.meta.icon" />
                            </el-icon>
                            <span>{{ subItem.meta.title }}</span>
                        </template>
                        <!-- 嵌套递归 -->
                        <template v-for="subItem2 in subItem.children" :key="subItem2.name">
                            <!-- 有子路由 -->
                            <el-sub-menu v-if="subItem2.children && subItem2.children.length > 0" :index="subItem2.name">
                                <template #title>
                                    <el-icon>
                                        <component :is="subItem2.meta.icon" />
                                    </el-icon>
                                    <span>{{ subItem2.meta.title }}</span>
                                </template>
                                <el-menu-item :index="subItem2.name">
                                    <el-icon>
                                        <component :is="subItem2.meta.icon" />
                                    </el-icon>
                                    <template #title>{{ subItem2.meta.title }}</template>
                                </el-menu-item>
                            </el-sub-menu>
                            <!-- 无子路由 -->
                            <el-menu-item v-else :index="subItem2.name" @click="handleClickMenu(subItem2)">
                                <el-icon>
                                    <component :is="subItem2.meta.icon" />
                                </el-icon>
                                <template #title><span>{{ subItem2.meta.title }}</span></template>
                            </el-menu-item>
                        </template>
                        <!-- 嵌套递归 -->
                    </el-sub-menu>
                    <!-- 无子路由 -->
                    <el-menu-item v-else :index="subItem.name" @click="handleClickMenu(subItem)">
                        <el-icon>
                            <component :is="subItem.meta.icon" />
                        </el-icon>
                        <template #title><span>{{ subItem.meta.title }}</span></template>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts" name="layouts-menu">
import { main } from '@/store'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Menu } from '@/api/interface'

const mainState = main()

const isExpand = computed(() => mainState.isExpand)
const title = import.meta.env.VITE_TITLE // 环境变量中读取

const [router, route] = [useRouter(), useRoute()]

const layoutChildren: any = router.options.routes.find(e => e.name === 'layout')?.children

const activeMenu = computed(() => route.meta.activeMenu ? route.meta.activeMenu : route.name) as any

//处理点击菜单
const handleClickMenu = (menu: Menu.MenuOptions) => {
    router.push({name:menu.name})
}

//根据屏幕大小判断菜单栏是否展开
const screenWidth = document.body.clientWidth
if (screenWidth < 1200) {
    mainState.isExpand = false
}
if (screenWidth > 1200) {
    mainState.isExpand = true
}
</script>

<style scoped lang="scss">
.menu {
    height: 100%;

    .el-menu {
        border: 0;
    }

    .logo {
        height: var(--el-header-hight);
    }

    .logoTitle {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--el-color-primary);
        white-space: nowrap;
    }

    .el-scrollbar {
        height: calc(100% - 55px);
    }

    //激活时样式
    .el-menu {
            .el-menu-item {
                &.is-active {
                    background: var(--el-color-active);

                    &::before {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        width: 4px;
                        content: "";
                        background: var(--el-color-primary);
                    }
                }
            }

    }
}
</style>