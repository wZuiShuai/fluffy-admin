<template>
    <div class="header f-between">
        <div class="header-left f-center">
            <el-icon class="expandIcon" @click="collapse">
                <component :is="isExpand ? 'fold' : 'expand'" />
            </el-icon>
            <el-breadcrumb separator-icon="ArrowRight">
                <transition-group name="breadcrumb" mode="out-in">
                    <el-breadcrumb-item v-for="item in bread" :key="item.path" :to="{ path: item.path }">
                        <el-icon>
                            <component :is="item.icon" />
                        </el-icon>
                        <span class="title">{{ item.title }}</span>
                    </el-breadcrumb-item>
                </transition-group>
            </el-breadcrumb>
        </div>
        <div class="header-right">
            <el-icon @click="toggleDark()"><component :is="isDark ? 'Moon' : 'Sunny'" /></el-icon>
            <el-icon style="transform: rotate(0.125turn);" @click="toggle()"><component :is="isFullscreen ? 'Rank' : 'Rank'" /></el-icon>
        </div>
    </div>
</template>

<script setup lang="ts" name="layouts-header">
import { main } from '@/store'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useFullscreen } from '@vueuse/core'

import { useDark, useToggle } from '@vueuse/core'
//黑暗模式
const isDark = useDark()
const toggleDark = useToggle(isDark)
//全屏
const { isFullscreen, toggle } = useFullscreen()

const mainState = main()

const route = useRoute()

const isExpand = computed(() => mainState.isExpand)
const collapse = () => {
    mainState.isExpand = !mainState.isExpand
}

const bread = route.matched.splice(1,route.matched.length - 1).map(e => Object.assign(e.meta,{path:e.path}))


</script>

<style scoped lang="scss">
.header {
    height: 100%;

    .header-left {
        .expandIcon {
            margin-right: 20px;
            font-size: 1.4rem;
            cursor: pointer;
        }

        .el-breadcrumb{
            font-size: 0.875rem;
            .el-icon{
                margin-right: 6px;
            }
        }

    }
    .header-right{
        .el-icon{
            margin-right: 1rem;
            cursor: pointer;
            font-size: 1.125rem;
        }
    }

}

:deep(.el-breadcrumb__inner){
    display: flex;
    align-items: center;
}

/* Breadcrumb */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
	transition: all 0.2s ease;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
	opacity: 0;
	transform: translateX(10px);
}
.breadcrumb-leave-active {
	position: absolute;
	z-index: -1;
}
</style>