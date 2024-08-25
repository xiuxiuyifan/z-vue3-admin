import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

import installIcons from '@/icons/index'
import 'virtual:svg-icons-register'

import 'element-plus/dist/index.css'
import './styles/index.less'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

installIcons(app)

app.mount('#app')
