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
        <div class="header-right f-between">
            <el-icon @click="toggleDark()"><component :is="isDark ? 'Moon' : 'Sunny'" /></el-icon>
            <i :class="['el-icon','iconfont', isFullscreen ? 'icon-tuichuquanping' : 'icon-quanping']" @click="toggle()"></i>
            <el-dropdown trigger="click">
                <div class="avatar">
                    <img src="@/assets/avatar.webp" alt="avatar" />
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <!-- divided 分隔符 -->
                        <el-dropdown-item icon="SwitchButton" @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts" name="layouts-header">
import { main } from '@/store'
import { computed } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

import { useFullscreen } from '@vueuse/core'

import { inject } from 'vue'

const toggleDark:any = inject('toggleDark')
const isDark:string | undefined = inject('isDark')
//全屏
const { isFullscreen, toggle } = useFullscreen()

const mainState = main()

const [route,router] = [useRoute(),useRouter()]

const isExpand = computed(() => mainState.isExpand)
const collapse = () => {
    mainState.isExpand = !mainState.isExpand
}

const bread = route.matched.splice(1,route.matched.length - 1).map(e => Object.assign(e.meta,{path:e.path}))

//退出
const logout = () => {
    ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        localStorage.clear()
        sessionStorage.clear()
        // 重定向到登陆页
        router.replace('/login')
        ElMessage.success('退出登录成功！')
    })

}
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

        .avatar{
            display: block;
            width: 2.5rem;
            height: 2.5rem;
            img{
                width: 100%;
                height: 100%;
            }
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