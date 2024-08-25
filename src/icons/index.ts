import SvgIcon from '@/components/SvgIcon/index.vue'
import type { App } from 'vue'

export default (app: App) => {
  app.component('svg-icon', SvgIcon)
}
