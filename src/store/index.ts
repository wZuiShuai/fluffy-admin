import { defineStore, createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const main = defineStore("main", {
  // id: 必须的，在所有 Store 中唯一
  // id: "main",
  // state: 返回对象的函数
  state: () => ({
    // token
    token: "12313212",
    // userInfo
    userInfo: {},
    //国际化
    i18n: "zh",
  }),
  getters: {},
  actions: {},
  persist: {
    key: "msg",
    storage: localStorage,
    // paths: [],
  },
})

export default pinia
