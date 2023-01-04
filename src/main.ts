import { createApp } from 'vue'
import App from './App.vue'
import router from '@/routers'
import pinia from '@/store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/styles/index.scss'
// If you want to use ElMessage,ElMessageBox, import it.
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-message.css'

const app = createApp(App)

app.use(router)
app.use(pinia)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
