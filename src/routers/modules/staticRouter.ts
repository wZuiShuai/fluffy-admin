import { RouteRecordRaw } from 'vue-router'

/**
 * staticRouter(静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: { name: 'home' },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
        },
    },
    {
        path: '/',
        name: 'layout',
        component: () => import('@/layouts/index.vue'),
        redirect: { name: 'home' }, //有children就要写redirect 否则面包屑有问题
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/home/index.vue'),
                meta:{
                    icon:'HomeFilled',
                    title:'首页',
                }
            },
            {
                path: 'ho',
                name: 'home222',
                component: () => import('@/views/home/index.vue'),
                meta:{
                    icon:'EditPen',
                    title:'首页123',
                },
                redirect: { name: 'home3333' },
                children: [
                    {
                        path: 'h',
                        name: 'home3333',
                        component: () => import('@/views/home/index.vue'),
                        meta:{
                            icon:'HomeFilled',
                            title:'首页22',
                        }
                    },
                    {
                        path: 'h44',
                        name: 'home44444',
                        component: () => import('@/views/home/index.vue'),
                        meta:{
                            icon:'HomeFilled',
                            title:'首页2244',
                        }
                    },
                ]
            }
        ],
    },
]

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter = [
    {
        path: '/403',
        name: '403',
        component: () => import('@/views/errorPage/404.vue'),
        meta: {
            title: '403页面',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: { name: 'NotFound' },
    },
    {
        path: '/404',
        name: 'NotFound',
        component: () => import('@/views/errorPage/404.vue'),
        meta: {
            title: '404页面',
        },
    },
    {
        path: '/500',
        name: '500',
        component: () => import('@/views/errorPage/404.vue'),
        meta: {
            title: '500页面',
        },
    },
]
