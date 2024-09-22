import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import installIcons from '@/icons/index'
import 'virtual:svg-icons-register'

import 'element-plus/dist/index.css'
import './styles/index.scss'

import App from './App.vue'
import router from './router'
import { setupStore } from './stores'

const app = createApp(App)

app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
setupStore(app)
installIcons(app)

app.mount('#app')
