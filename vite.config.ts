import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

import vueSetupExtend from "vite-plugin-vue-setup-extend"

import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import path from "path"

const pathSrc = path.resolve(__dirname, "src")

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/": `${pathSrc}/`,
    },
    extensions: [".js", ".json", ".ts"], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    vueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
          // directives: true,
          // version: "2.1.5",
        }),
      ],
    }),
  ],
  base: "./", // 设置打包路径
})
