import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

import vueSetupExtend from 'vite-plugin-vue-setup-extend'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@/': `${pathSrc}/`,
        },
        extensions: ['.js', '.json', '.ts'], // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "@/styles/element/index.scss" as *;',
            },
        },
    },
    server: {
        // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
        host: '0.0.0.0',
        port: 8080,
        open: true,
        cors: true,
        // 跨域代理配置
        proxy: {
            '/api': {
                target: 'http://golf.zhenyujm.com/admin/user/login',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    plugins: [
        vue(),
        vueSetupExtend(),
        eslintPlugin({
            include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass',
                }),
            ],
            dts: 'src/components.d.ts',
        }),
    ],
    base: './', // 设置打包路径
})
